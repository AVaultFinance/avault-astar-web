import React, { useState, useCallback } from 'react';
import { Button } from '@avault/ui';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import { InputWrap, StyledTokenInputTop, StyledInput, PageContainer } from './style/DappstakeStyle';
import useUnstakeFarms from './hooks/useUnstakeFarms';
import Balance from './components/StakeTableBalance';
import DappstakePage from './components/DappstakePage';
import { useDAppStackingContract } from 'hooks/useContract';
import { GetPoolUpdate } from './hooks/getPoolUpdate';
import useStakeWrap from './hooks/useStakeWrap';
import PageLayout from 'components/Layout/Page';
import TokenIconItem from './components/TokenIconItem';
import ArrowDown from './components/svg/arrow_down';
const Unstake = () => {
  const contract = useDAppStackingContract();
  const pool = GetPoolUpdate(contract);
  const {
    balance,
    isBalanceZero,
    decimals,
    fullBalance,
    pid,
  }: {
    balance: BigNumber;
    isBalanceZero: boolean;
    decimals: number;
    fullBalance: string;
    pid: number;
  } = useStakeWrap();
  const { onUnstake } = useUnstakeFarms(pid);
  const { toastSuccess, toastError } = useToast();
  const [val, setVal] = useState('');
  const [pendingTx, setPendingTx] = useState(false);
  const lpTokensToStake = new BigNumber(val);
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );
  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);
  const handleUnstake = async (amount: string) => {
    await onUnstake(amount);
  };

  return (
    <PageLayout>
      <PageContainer>
        <DappstakePage contract={contract} pool={pool}>
          <Balance
            balance={balance}
            decimals={decimals}
            symbol="CCTO"
            isBalanceZero={isBalanceZero}
            handleSelectMax={handleSelectMax}
          />
          <InputWrap>
            <StyledTokenInputTop isWarning={isBalanceZero}>
              <TokenIconItem symbol="CCTO" tokenAddress="0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5" />
              <StyledInput
                pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
                inputMode="decimal"
                step="any"
                min="0"
                onChange={handleChange}
                placeholder="0"
                value={val}
              />
            </StyledTokenInputTop>

            <StyledTokenInputTop isWarning={isBalanceZero}>
              <TokenIconItem symbol="CTO" tokenAddress="0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5" />
              <StyledInput
                pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
                inputMode="decimal"
                step="any"
                min="0"
                onChange={handleChange}
                placeholder="0"
                value={val}
              />
            </StyledTokenInputTop>
            <ArrowDown />
          </InputWrap>
          <Button
            width="100%"
            padding="0"
            disabled={pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(balance)}
            onClick={async () => {
              setPendingTx(true);
              try {
                await handleUnstake(val);
                toastSuccess('Unstaked!', 'Your earnings have also been harvested to your wallet');
              } catch (e) {
                toastError(
                  'Error',
                  'Please try again. Confirm the transaction and make sure you are paying enough gas!',
                );
                console.error(e);
              } finally {
                setPendingTx(false);
              }
            }}
          >
            {pendingTx ? 'Confirming' : 'Confirm'}
          </Button>
        </DappstakePage>
      </PageContainer>
    </PageLayout>
  );
};

export default Unstake;
