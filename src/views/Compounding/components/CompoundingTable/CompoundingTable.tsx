import React, { useRef } from 'react';
import styled from 'styled-components';
import { useTable, ColumnType } from '@avault/ui';

import Row, { RowProps } from './Row';
import TableHeader from '../TableHeader';
import { OptionProps } from 'components/Select/Select';
import { ISortDir } from 'components/SortIcon';
import { compoundingData } from 'state/compounding/types';

export interface ITableProps {
  data: RowProps[];
  columns: ColumnType<RowProps>[];
  userDataReady: boolean;
  sortDir: ISortDir;
  sortKey: string;
  sortColumn?: string;
  onOptionChange?: (option: OptionProps) => void;
}

const Container = styled.div`
  // filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    background: ${({ theme }) => theme.card.background};
    border-radius: 12px;
    margin: 16px 0px;
    // padding-bottom: 20px;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    // border: 1px solid #2e2d5b;
  }
`;

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 12px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  overflow: hidden;
`;

export const TableHeaderStyled = styled.thead`
  & tr {
    background: ${({ theme }) => theme.colors.cardBackground};

    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`;
const TableBody = styled.tbody`
  & tr {
    background: ${({ theme }) => theme.colors.cardBackground};
    transition: all 0.3s ease;
    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
    }
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`;

const TableContainer = styled.div`
  position: relative;
  table tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }

  table tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }
  // table tr:first-child td:first-child {
  //   border-top-left-radius: 10px;
  // }

  // table tr:first-child td:last-child {
  //   border-top-right-radius: 10px;
  // }
`;

const CompoundingTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null);
  const { data, columns, userDataReady, onOptionChange, sortDir, sortKey } = props;

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'compounding' });
  if (!rows.length) {
    return null;
  }
  return (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableHeader sortDir={sortDir} sortKey={sortKey} onOptionChange={onOptionChange} />

            <TableBody>
              {[...rows, ...compoundingData].map((row, index) => {
                return (
                  <Row
                    {...row.original}
                    isLast={index === rows.length - 1}
                    userDataReady={userDataReady}
                    key={`table-row-${row.id}`}
                  />
                );
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
        {/* <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            {t('To Top')}
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer> */}
      </TableContainer>
    </Container>
  );
};

export default CompoundingTable;
