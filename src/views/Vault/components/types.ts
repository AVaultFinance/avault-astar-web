export type TableProps = {
  data?: TableDataTypes[];
  selectedFilters?: string;
  sortBy?: string;
  sortDir?: string;
  onSort?: (value: string) => void;
};

export type ColumnsDefTypes = {
  id: number;
  label: string;
  name: string;
  sortable: boolean;
};

export type ScrollBarProps = {
  ref: string;
  width: number;
};

export type TableDataTypes = {
  POOL: string;
  APR: string;
  EARNED: string;
  STAKED: string;
  DETAILS: string;
  LINKS: string;
};

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'vault',
    sortable: true,
    label: '',
  },
  {
    id: 7,
    name: 'net',
    sortable: false,
    label: 'Net Value',
  },
  {
    id: 3,
    name: 'liquidity',
    sortable: true,
    label: 'TVL',
  },
  {
    id: 4,
    name: 'apr',
    sortable: true,
    label: 'APR',
  },
  {
    id: 2,
    name: 'earned',
    sortable: true,
    label: 'Rewards',
  },

  {
    id: 6,
    name: 'details',
    sortable: true,
    label: '',
  },
];

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}
