export interface Pagination {
  className?: string;
  style?: React.CSSProperties;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  current?: number;
  defaultCurrent?: number;
  pageSizeOptions?: Array<number>;
  maxPageBtn?: number;
  foldedMaxPageBtn?: number;
  showFirstAndLastPageBtn?: boolean;
  showPreviousAndNextBtn?: boolean;
  showPageSizeOptions?: boolean;
  showJumper?: boolean;
  size?: 'small' | 'normal' | 'large';
  onPageSizeChange?: (newPageSize: number) => void;
  onCurrentChange?: (newPageIndex: number) => void;
}

export interface PaginationButtons {
  pageCount: number;
  current: number;
  maxPageBtn: number;
  foldedMaxPageBtn: number;
  showFirstAndLastPageBtn: boolean;
  showPreviousAndNextBtn: boolean;
  onButtonClick: (pageIndex: number) => void;
}

export interface PaginationButton {
  pageIndex: number;
  active: boolean;
  onClick: (pageIndex: number) => void; 
}

export interface PrevNextButton {
  pageCount: number;
  current: number;
  type: 'prev' | 'next';
  disabled: boolean;
  onClick: (pageIndex: number) => void
}

export interface EllipsisButton {
  pageCount: number;
  current: number;
  foldedMaxPageBtn: number,
  type: 'prev' | 'next';
  disabled: boolean;
  onClick: (pageIndex: number) => void
}

export interface PaginationMini {
  className?: string;
  style?: React.CSSProperties;
  total?: number;
  pageSize?: number;
  current?: number;
  defaultCurrent?: number;
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  jumpable?: boolean;
  onCurrentChange?: (newPageSize: number) => void;
}
