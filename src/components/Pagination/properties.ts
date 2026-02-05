import { Pagination, PaginationMini } from "./type"

export const paginationDefaultProps: Pagination = {
  className: '',
  style: {},
  defaultPageSize: 5,
  defaultCurrent: 1,
  pageSizeOptions: [5, 10, 20, 50, 100],
  maxPageBtn: 10,
  foldedMaxPageBtn: 5,
  showFirstAndLastPageBtn: false,
  showPreviousAndNextBtn: false,
  showPageSizeOptions: false,
  showJumper: false,
  size: 'normal',
}

export const paginationMiniDefaultProps: PaginationMini = {
  className: '',
  style: {},
  pageSize: 5,
  defaultCurrent: 1,
  size: 'normal',
  disabled: false,
  jumpable: false,
}
