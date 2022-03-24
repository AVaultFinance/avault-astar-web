import React, { FC } from 'react';
import styled from 'styled-components';
import DappstakeSubNav from './SubNav';
import { IDappStakingInterface } from 'utils/types';
import { IDappPoolDataInterface } from '../hooks/getPoolUpdate';
import { W480BorderPageLayout } from 'style/SmallBorderPageLayout';

const StyledPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 0;
  min-height: calc(100vh-64px);
  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 0;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 10px;
    min-height: calc(100vh-64px);
  }
`;
const StyledPage = ({ children, ...props }) => {
  return <StyledPageStyle {...props}>{children}</StyledPageStyle>;
};

const TableContent = styled.div`
  border-radius: 20px;
  padding: 30px 16px 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px 30px 30px;
  }
`;
// slippageAdjustedAmounts
interface Iprops {
  children: React.HTMLAttributes<HTMLDivElement>;
  contract: IDappStakingInterface;
  pool: IDappPoolDataInterface;
}
const DappstakePage: FC<Iprops> = ({ children, contract, pool, ...props }) => {
  return (
    <W480BorderPageLayout>
      <TableContent>
        <DappstakeSubNav />
        <StyledPage>{children}</StyledPage>
      </TableContent>
    </W480BorderPageLayout>
  );
};
export default DappstakePage;
