export interface Pagination {
  className?: string;
  style?: React.CSSProperties;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  current?: number;
  defaultCurrent?: number;
  pageSizeOptions?: Array<number>;
  onPageSizeChange?: (newPageSize: number) => void;
}
