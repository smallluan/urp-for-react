import { useMemo, useState } from "react"
import genClassNameByProps from "../utils/tools/className.ts"
import "./style.less"
import { TableType } from "./type"
import { tableDefaultProps } from "./properties.ts"

import { USpace } from "../Space/index.ts"
import { UPagination } from "../Pagination/index.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import CellComponent from "./Components/CellComponents.tsx"

const UTable = (props: TableType) => {

  const { merged: _props } = useMergedProps(
    tableDefaultProps,
    props,
    [
      'className', 'style', 'data', 'columns',
      'stripe', 'bordered', 'hover', 'showHeader',
      'showIndex', 'pagination', 'status', 'onChange'
    ]
  )

  // 这个后面要区分受控/非受控，这里现这么写
  const [currPageIndex, setCurrPageIndex] = useState(1)

  // 可见行数据（比如分页，有些行看不到）
  const visibleData = useMemo(() => {
    if (!_props.pagination) return _props.data
    const { pageSize } = _props.pagination
    // 需要显示的起止索引
    const startIndex = pageSize * (currPageIndex - 1)
    const endIndex = startIndex + pageSize

    return _props.data.slice(startIndex, endIndex)
  }, [_props.pagination, _props.data, currPageIndex])

  const tableClass = useMemo(() => {
    return genClassNameByProps(
      {
        stripe: _props.stripe,
        bordered: _props.bordered,
        hover: _props.hover
      },
      "u-table",
      "u-table",
      _props.className
    )
  }, [_props.className, _props.stripe, _props.bordered, _props.hover])


  // 统一值变化事件
  const onChange = (oldValue, newValue) => {
    _props.onChange?.(oldValue, newValue)
  }


  return (
    <USpace direction="vertical" gap={16}>
      <table
        className={tableClass}
        style={_props.style}
      >
        {
          _props.showHeader &&
          <thead className="u-table-head">
            <tr>
              {
                _props.columns.map(col => (
                  <th className="u-table-th" style={{width: `${col.width}px`}} key={col.key}>{col.title}</th>
                ))
              }
            </tr>
          </thead>
        }
        
        <tbody>
          {
            visibleData.map((row, rowIndex) => {
              return <tr className="u-table-tr" key={row.id}>
                {
                  _props.columns.map((col, colIndex) => (
                    <td className="u-table-td" key={col.key}>
                      <CellComponent
                        type={col.type}
                        value={row[col.key]?.value}
                        properties={row[col.key]?.props}
                        render={row[col.key]?.render}
                        colProps={col.props}
                        status={_props.status}
                        position={{rowIndex, colIndex}}
                        onChange={onChange}
                        data={_props.data}
                        columns={_props.columns}
                      />
                    </td>
                  ))
                }
              </tr>
            })
          }
        </tbody>
      </table>
      {
        _props.pagination &&
        <UPagination
          total={_props.data.length}
          current={currPageIndex}
          onCurrentChange={(val) => setCurrPageIndex(val)}
          {..._props.pagination}
        />
      }
    </USpace>
    
  )
}

export default UTable
