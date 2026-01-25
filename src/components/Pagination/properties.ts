import { Pagination } from "./type"

export const paginationDefaultProps: Pagination = {
  className: '',
  style: {},
  defaultPageSize: 5,
  defaultCurrent: 1,
  pageSizeOptions: [5, 10, 20, 50, 100]
}