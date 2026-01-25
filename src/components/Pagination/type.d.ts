export interface Pagination {
  className?: string;
  style?: React.CSSProperties;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  current?: number;
  defaultCurrent?: number;
  pageSizeOptions?: Array<number>;
  showJumper?: boolean;
  maxPageBtn?: number;
  foldedMaxPageBtn?: number;
  showFirstAndLastPageBtn?: boolean,
  onPageSizeChange?: (newPageSize: number) => void;
  onCurrentChange?: (newPageIndex: number) => void;
}

export interface PaginationButtons {
  pageCount: number;
  current: number;
  maxPageBtn: number;
  foldedMaxPageBtn: number;
  showFirstAndLastPageBtn: boolean;
  onButtonClick: (pageIndex: number) => void;
}

export interface PaginationButton {
  pageIndex: number;
  active: boolean;
  onClick: (pageIndex: number) => void; 
}
