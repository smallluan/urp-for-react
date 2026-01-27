import { useMemo, useState } from "react"
import genClassNameByProps from "../utils/tools/className.ts"
import "./style.less"
import { TableType } from "./type"
import { tableDefaultProps } from "./properties.ts"

import { UTag } from "../Tag/index.ts"
import { USwitch } from "../Switch/index.ts"
import { USelect } from "../Select/index.ts"
import { ULink } from "../Link/index.ts"
import { UTypo } from "../Typo/index.ts"
import { USpace } from "../Space/index.ts"
import { UPagination } from "../Pagination/index.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"

const UTable = (props: TableType) => {

  const { merged: _props } = useMergedProps(
    tableDefaultProps,
    props,
    [
      'className', 'style', 'data', 'columns',
      'stripe', 'bordered', 'hover', 'showHeader',
      'showIndex', 'pagination'
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
            visibleData.map(row => {
              return <tr className="u-table-tr" key={row.id}>
                {
                  _props.columns.map(col => (
                    <td className="u-table-td" key={col.key}>
                      <CellComponent
                        type={col.type}
                        value={row[col.key]?.value}
                        properties={row[col.key]?.props}
                        render={row[col.key]?.render}
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

const CellComponent = (
  props: {
    type: string,
    value: any,
    properties: Record<string, any>,
    render: React.ReactNode
  }
) => {
  if (props.type === 'tag') {
    return (
      <UTag content={props.value} {...props.properties}/>
    )
  } else if (props.type === 'switch') {
    return (
      <USwitch state={props.value} {...props.properties}/>
    )
  } else if (props.type === 'select') {
    return (
      <USelect value={props.value} {...props.properties}/>
    )
  } else if (props.type === 'link') {
    return (
      <ULink content={props.value} {...props.properties} />
    )
  } else if (props.type === 'text') {
    return (
      <UTypo.Text>{props.value}</UTypo.Text>
    )
  } else if (props.type === 'custom') {
      return (
        props.render
      )
  } else {
    return (
      <div>未知组件</div>
    )
  }
}

export default UTable
