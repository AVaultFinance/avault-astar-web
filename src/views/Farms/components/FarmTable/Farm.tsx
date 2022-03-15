import React from 'react';
import styled from 'styled-components';
// import { useFarmUser } from 'state/farms/hooks';
// import { useTranslation } from 'contexts/Localization';
// import { Text } from '@avault/ui';
// import { getBalanceNumber } from 'utils/formatBalance';
import { Token } from 'config/constants/types';
import { TokenPairImage } from 'components/TokenImage';
import { chainId } from 'config/constants/tokens';

export interface FarmProps {
  label?: string;
  pid: number;
  token: Token;
  quoteToken: Token;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  > div {
    > .label {
      font-size: 13px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text};
      ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 16px;
      }
    }
    > .ratio {
      margin-top: 11px;
      font-size: 14px;
      color: #9da6a6;
    }
  }
`;

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 44px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 20px;
    width: 70px;
  }
`;

const Farm: React.FunctionComponent<FarmProps> = ({ token, quoteToken, label, pid }) => {
  // const { stakedBalance } = useFarmUser(pid);
  // const { t } = useTranslation();
  // const rawStakedBalance = getBalanceNumber(stakedBalance);

  // const handleRenderFarming = (): JSX.Element => {
  //   if (rawStakedBalance) {
  //     return (
  //       <Text color="textSubtle" fontSize="12px" bold textTransform="uppercase">
  //         {t('Farming')}
  //       </Text>
  //     );
  //   }

  //   return null;
  // };
  return (
    <Container>
      <TokenWrapper>
        <TokenPairImage
          variant="inverted"
          primaryToken={token.address[chainId]}
          secondaryToken={quoteToken.address[chainId]}
          width={48}
          height={48}
        />
      </TokenWrapper>
      <div>
        <div className="label">{label}</div>
        {/* <div className="ratio">
          <span>50%</span>-<span>50%</span>
        </div> */}
      </div>
    </Container>
  );
};

export default Farm;