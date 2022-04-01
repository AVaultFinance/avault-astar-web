import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { splitSignature } from '@ethersproject/bytes';
import { Contract } from '@ethersproject/contracts';
import { TransactionResponse } from '@ethersproject/providers';
import { ETHER } from '@avault/sdk';
import { Modal, Button, Box, Flex, Input, Heading, useMatchBreakpoints } from '@avault/ui';
import { BigNumber } from '@ethersproject/bignumber';
import { useTranslation } from 'contexts/Localization';
import { RowBetween } from 'components/Layout/Row';
import ConnectWalletButton from 'components/ConnectWalletButton';
import { usePairContract } from 'hooks/useContract';
import useTransactionDeadline from 'hooks/useTransactionDeadline';
import { useTransactionAdder } from 'state/transactions/hooks';
import { calculateGasMargin, calculateSlippageAmount, getRouterContract } from 'utils';

import { wrappedCurrency } from 'utils/wrappedCurrency';
import { useApproveCallback, ApprovalState } from 'hooks/useApproveCallback';
import Dots from 'components/Loader/Dots';
import { useBurnActionHandlers, useDerivedBurnInfo } from 'state/burn/hooks';

import { Field } from 'state/burn/actions';
import { useUserSlippageTolerance } from 'state/user/hooks';
import { chainId } from 'config/constants/tokens';
import { IToken } from 'views/Zap/utils/types';
import { IVault } from 'state/vault/types';
import { tokenIndex } from 'views/Zap/constants/data';
import ZapCurrencyLogo from 'views/Zap/components/ZapCurrencyLogo';
import { MaxButton } from 'style/SmallBorderPageLayout';
import ZapBalance from 'views/Zap/components/ZapBalance';
import { useCurrency } from 'hooks/Tokens';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ROUTER_ADDRESS } from 'config/constants';

interface RemoveLiquidityModalProps {
  vault: IVault;
  index: number;
  account: string;
  onDismiss?: () => void;
}
const RemoveLiquidityModal: React.FC<RemoveLiquidityModalProps> = ({ vault, account, index, onDismiss }) => {
  const [fullBalance, setMax] = useState('0');
  const [val, setVal] = useState('');

  const token: IToken = tokenIndex[index][1];
  const currencyIdA = token.token.address[chainId];
  const currencyIdB = token.quoteToken.address[chainId];
  const fromCurrency = token.token;
  const toCurrency = token.quoteToken;
  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined];
  const { library } = useActiveWeb3React();
  const [tokenA, tokenB] = useMemo(
    () => [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)],
    [currencyA, currencyB],
  );

  const { t } = useTranslation();

  // burn state
  const { pair, parsedAmounts } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined);
  const { onUserInput: _onUserInput } = useBurnActionHandlers();

  // modal and loading
  const [attemptingTxn, setAttemptingTxn] = useState(false); // clicked confirm

  // txn values
  const [txHash, setTxHash] = useState<string>('');
  const deadline = useTransactionDeadline();
  const [allowedSlippage] = useUserSlippageTolerance();

  // pair contract
  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address);

  // allowance handling
  const [signatureData, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(
    null,
  );
  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], ROUTER_ADDRESS[chainId]);

  async function onAttemptToApprove() {
    if (!pairContract || !pair || !library || !deadline) throw new Error('missing dependencies');
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY];
    if (!liquidityAmount) throw new Error('missing liquidity amount');

    // try to gather a signature for permission
    const nonce = await pairContract.nonces(account);

    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ];
    const domain = {
      name: 'Kaco LPs',
      version: '1',
      chainId,
      verifyingContract: pair.liquidityToken.address,
    };
    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ];
    const message = {
      owner: account,
      spender: ROUTER_ADDRESS,
      value: liquidityAmount.raw.toString(),
      nonce: nonce.toHexString(),
      deadline: deadline.toNumber(),
    };
    const data = JSON.stringify({
      types: {
        EIP712Domain,
        Permit,
      },
      domain,
      primaryType: 'Permit',
      message,
    });

    library
      .send('eth_signTypedData_v4', [account, data])
      .then(splitSignature)
      .then((signature) => {
        setSignatureData({
          v: signature.v,
          r: signature.r,
          s: signature.s,
          deadline: deadline.toNumber(),
        });
      })
      .catch((err) => {
        // console.log('sign err', err);
        // for all errors other than 4001 (EIP-1193 user rejected request), fall back to manual approve
        if (err?.code !== 4001) {
          approveCallback();
        }
      });
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, value: string) => {
      setSignatureData(null);
      return _onUserInput(field, value);
    },
    [_onUserInput],
  );

  // tx sending
  const addTransaction = useTransactionAdder();
  async function onRemove() {
    if (!chainId || !library || !account || !deadline) throw new Error('missing dependencies');
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts;
    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts');
    }
    const router = getRouterContract(chainId, library, account);

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    };

    if (!currencyA || !currencyB) throw new Error('missing tokens');
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY];
    if (!liquidityAmount) throw new Error('missing liquidity amount');

    const currencyBIsETH = currencyB === ETHER[chainId];
    const oneCurrencyIsETH = currencyA === ETHER[chainId] || currencyBIsETH;

    if (!tokenA || !tokenB) throw new Error('could not wrap');

    let methodNames: string[];
    let args: Array<string | string[] | number | boolean>;
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens'];
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadline.toHexString(),
        ];
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity'];
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadline.toHexString(),
        ];
      }
    }
    // we have a signataure, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens'];
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ];
      }
      // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit'];
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ];
      }
    } else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.');
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        router.estimateGas[methodName](...args)
          .then(calculateGasMargin)
          .catch((err) => {
            console.error(`estimateGas failed`, methodName, args, err);
            return undefined;
          }),
      ),
    );

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
      BigNumber.isBigNumber(safeGasEstimate),
    );

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.');
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation];
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation];

      setAttemptingTxn(true);
      await router[methodName](...args, {
        gasLimit: safeGasEstimate,
      })
        .then((response: TransactionResponse) => {
          setAttemptingTxn(false);

          addTransaction(response, {
            summary: `Remove ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currencyA?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencyB?.symbol}`,
          });

          setTxHash(response.hash);
        })
        .catch((err: Error) => {
          setAttemptingTxn(false);
          // we only care if the error is something _other_ than the user rejected the tx
          console.error(err);
        });
    }
  }

  const pendingText = t('Removing %amountA% %symbolA% and %amountB% %symbolB%', {
    amountA: parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    symbolA: currencyA?.symbol ?? '',
    amountB: parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
    symbolB: currencyB?.symbol ?? '',
  });

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        // setVal(e.currentTarget.value.replace(/,/g, '.'));
        const value = e.currentTarget.value.replace(/,/g, '.');
        setVal(value);
      }
    },
    [setVal],
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance]);

  const { isMd, isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isMd || isXl || isLg);

  return (
    <Modal
      title={`Remove LP`}
      minWidth={isMobile ? '343px' : '480px'}
      headerPadding={isMobile ? '0 16px' : '20px 30px 6px'}
      bodyPadding={isMobile ? '0 16px' : '0 30px 30px'}
    >
      <TitleStyled>
        {vault.lpDetail.symbol}
        {' > '}
        {fromCurrency.symbol}+{toCurrency.symbol}
      </TitleStyled>
      <Flex alignItems="center" justifyContent="end" paddingTop="4px">
        <ZapBalance account={account} currency={token} setMax={setMax} />
        <MaxButtonStyled variant="text" onClick={handleSelectMax}>
          Max
        </MaxButtonStyled>
      </Flex>
      <InnerStyled border={Number(`${val}`) > 0}>
        <FlexCol>
          <FlexCol>
            <ZapCurrencyLogo currency={token} />
            <TokenStyled>{vault.lpDetail.symbol}</TokenStyled>
          </FlexCol>
          <Flex alignItems="end" justifyContent="center" flexDirection="column">
            <StyledInput
              pattern={`^[0-9]*[.,]?[0-9]{0,8}$`}
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="0"
              value={val}
              onChange={handleChange}
            />
          </Flex>
        </FlexCol>
      </InnerStyled>

      <Box position="relative">
        {!account ? (
          <ConnectWalletButton />
        ) : (
          <RowBetween>
            <Button
              variant={approval === ApprovalState.APPROVED || signatureData !== null ? 'success' : 'primary'}
              onClick={onAttemptToApprove}
              disabled={approval !== ApprovalState.NOT_APPROVED || signatureData !== null}
              width="100%"
              mr="0.5rem"
            >
              {approval === ApprovalState.PENDING ? (
                <Dots>{t('Enabling')}</Dots>
              ) : approval === ApprovalState.APPROVED || signatureData !== null ? (
                t('Approved')
              ) : (
                t('Approve')
              )}
            </Button>
            <Button
              width="100%"
              disabled={!(approval === ApprovalState.APPROVED || signatureData !== null)}
              onClick={onRemove}
            >
              {t('Confirm')}
            </Button>
          </RowBetween>
        )}
      </Box>
    </Modal>
  );
};
const StyledInput = styled(Input)`
  box-shadow: none;
  padding: 0;
  border-width: 0px;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  text-align: right;
  font-size: 18px;
`;

const MaxButtonStyled = styled(MaxButton)`
  font-size: 12px;
  height: 30px;
`;
const FlexCol = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;
const TokenStyled = styled(Heading)`
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
`;
const InnerStyled = styled.div<{ border: boolean }>`
  background: ${({ theme }) => theme.colors.background};
  transition: all 0.3s ease;
  border-radius: 12px;
  position: relative;
  margin-bottom: 30px;
  border: 1px solid ${({ theme, border }) => (border ? theme.colors.text : theme.colors.borderColor)};
  padding: 10px 20px;
`;
const TitleStyled = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: 600;
`;
export default RemoveLiquidityModal;
