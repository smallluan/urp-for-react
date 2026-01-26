import { useMemo } from "react"
import genClassNameByProps from "../utils/tools/className.ts"
import "./style.less"

import { UTag } from "../Tag/index.ts"
import { USwitch } from "../Switch/index.ts"
import { USelect } from "../Select/index.ts"
import { ULink } from "../Link/index.ts"
import { UTypo } from "../Typo/index.ts"
import { USpace } from "../Space/index.ts"
import { UPagination } from "../Pagination/index.ts"

const UTable = (props) => {

  const tableClass = useMemo(() => {
    return genClassNameByProps(
      {},
      "u-table",
      "u-table",
      props.className
    )
  }, [props.className])
  return (
    <USpace direction="vertical" gap={16}>
      <table
        className={tableClass}
        style={props.style}
      >
        <thead>
          <tr>
            {
              props.columns.map(col => (
                <th className="u-table-th" key={col.key}>{col.title}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            props.data.map(row => {
              return <tr key={row.id}>
                {
                  props.columns.map(col => (
                    <td className="u-table-td" key={col.key}>
                      <CellComponent
                        type={col.type}
                        value={row[col.key].value}
                        properties={row[col.key].props}
                      />
                    </td>
                  ))
                }
              </tr>
            })
          }
        </tbody>
      </table>
      <UPagination total={props.data.length}/>
    </USpace>
    
  )
}

const CellComponent = (
  props: {
    type: string,
    value: any,
    properties: Record<string, any>
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
  } else {
    return (
      <div>未知组件</div>
    )
  }
}

export default UTable
