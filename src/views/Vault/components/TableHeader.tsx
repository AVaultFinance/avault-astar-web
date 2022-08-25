import React, { FC } from 'react';
import { useMatchBreakpoints, Flex, useTooltip, HelpIcon } from '@my/ui';
import { TableHeaderStyled } from './VaultTable/VaultTable';
import styled from 'styled-components';
import { OptionProps } from 'components/Select/Select';
import SortIcon, { ISortDir } from 'components/SortIcon';
const TextStyled = styled(Flex)`
  padding-top: 30px;
  padding-bottom: 20px;
  font-weight: 600;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
  align-items: center;
`;
const TextStyledEnd = styled(Flex)`
  padding-top: 30px;
  padding-bottom: 20px;
  font-weight: 600;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
  align-items: center;
  justify-content: end;
`;
const FirstTh = styled(TextStyled)`
  padding-left: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 30px;
    padding-bottom: 20px;
    // padding-bottom: 20px;
    padding-left: 40px;
  }
`;
const SortIconStyled = styled(SortIcon)`
  width: 12px;
  margin-left: 4px;
  cursor: pointer;
`;

const ReferenceElement = styled.div`
  // display: inline-block;
  // vertical-align: middle;
  margin-left: 4px;
  svg {
    width: 18px;
  }
`;
interface Iprops {
  sortKey: string;
  sortDir: ISortDir;
  onOptionChange?: (option: OptionProps) => void;
}
const TableHeader: FC<Iprops> = ({ sortKey, sortDir, onOptionChange }) => {
  const { isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isXl || isLg);
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    "Farm APY is calculated based on the last 7 days' Net Value. Abnormally high APY may come from other user's withdrawal fees.",
    {
      placement: 'bottom-end',
      tootipStyle: {
        padding: '10px',
        whiteSpace: 'break-spaces',
        fontWeight: 'normal',
        textAlign: 'center',
        fontSize: '14px',
      },
      hideArrow: true,
      tooltipOffset: [20, 10],
    },
  );
  const HandleClick = (label: string, value: string) => {
    const side: ISortDir =
      sortKey === value
        ? sortDir === ISortDir.default
          ? ISortDir.down
          : sortDir === ISortDir.down
          ? ISortDir.up
          : sortDir === ISortDir.up
          ? ISortDir.default
          : ISortDir.down
        : ISortDir.down;
    onOptionChange({
      label: label,
      side: side,
      value: value,
    });
  };
  if (!isMobile) {
    return (
      <TableHeaderStyled>
        <tr>
          <td>
            <FirstTh>Token</FirstTh>
          </td>
          <TrStyled>
            <TextStyled>Net Value</TextStyled>
          </TrStyled>
          <TrStyled>
            <TextStyled onClick={() => HandleClick('TVL', 'liquidity')}>
              <p>TVL</p>
              <SortIconStyled sortDir={sortKey === 'liquidity' ? sortDir : ISortDir.default} />
            </TextStyled>
          </TrStyled>
          <TrStyledEnd>
            <TextStyledEnd onClick={() => HandleClick('APY', 'apy')}>
              <p>APY</p>
              <ReferenceElement ref={targetRef}>
                <HelpIcon color="textSubtle" />
              </ReferenceElement>
              {tooltipVisible && tooltip}
              <SortIconStyled sortDir={sortKey === 'apy' ? sortDir : ISortDir.default} />
            </TextStyledEnd>
          </TrStyledEnd>
          <TrStyled>
            <TextStyled>wallet balance</TextStyled>
          </TrStyled>
          <TrStyled>
            <TextStyled></TextStyled>
          </TrStyled>
        </tr>
      </TableHeaderStyled>
    );
  }
  // mobie
  return null;
};
const TrStyled = styled.th`
  padding-left: 18px;
`;
const TrStyledEnd = styled.th`
  padding-right: 40px;
`;
export default TableHeader;
