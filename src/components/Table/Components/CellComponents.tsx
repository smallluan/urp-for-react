import { UTag } from "../../Tag/index.ts"
import { USwitch } from "../../Switch/index.ts"
import { USelect } from "../../Select/index.ts"
import { ULink } from "../../Link/index.ts"
import { UTypo } from "../../Typo/index.ts"
import { UInput } from "../../Input/index.ts"
import { OnChangeEmit, TableType } from "../type"

const CellComponent = (
  props: {
    type: string,
    value: any,
    properties: Record<string, any>,
    render: React.ReactNode,
    colProps: Record<string, any>,  // 列的统一属性，优先级低于单独传的 properties
    status: 'editable' | 'readOnly' | 'disabled',
    position: {rowIndex: number, colIndex: number},
    onChange: (params: OnChangeEmit) => void,
    data: TableType['data'],
    columns: TableType['columns']
  }
) => {

  const genChangedData = (newValue) => {
    const nextData = [...props.data!]
    const { rowIndex, colIndex } = props.position
    const willChangeCell = nextData[rowIndex][props.columns[colIndex].key]
    willChangeCell.value = newValue
    return nextData
  }

  if (props.type === 'tag') {
    return (
      <UTag content={props.value} {...props.colProps} {...props.properties}/>
    )
  } else if (props.type === 'switch') {
    if (props.status === 'editable') {
      return (
        <USwitch
          state={props.value}
          {...props.colProps}
          {...props.properties}
          onStateChange={(newValue) => props.onChange({
            changed: {
              index: props.position,
              value: {
                oldValue: props.value,
                newValue: newValue
              }
            },
            value: genChangedData(newValue)
          })}
        />
      )
    } else if (props.status === 'readOnly') {
      return <UTypo.Text>{props.value ? '是' : '否'}</UTypo.Text>
    }
  } else if (props.type === 'select') {
    if (props.status === 'editable') {
      return (
        <USelect
          value={props.value}
          {...props.colProps}
          {...props.properties}
          onChange={(newValue) => props.onChange({
            changed: {
              index: props.position,
              value: {
                oldValue: props.value,
                newValue: newValue
              }
            },
            value: genChangedData(newValue)
          })}
        />
      )
    } else if (props.status === 'readOnly') {
      return (
        <UTypo.Text>{props.value}</UTypo.Text>
      )
    }
   
  } else if (props.type === 'input') {
    if (props.status === 'editable') {
      return (
        <UInput
          value={props.value}
          {...props.colProps}
          {...props.properties}
          onChange={(newValue) => props.onChange({
            changed: {
                index: props.position,
                value: {
                  oldValue: props.value,
                  newValue: newValue
                }
              },
              value: genChangedData(newValue)
          })}
        />
      )
    } else if (props.status === 'readOnly') {
      return (
        <UTypo.Text>{props.value}</UTypo.Text>
      )
    }
  } else if (props.type === 'link') {
    return (
      <ULink content={props.value} {...props.colProps} {...props.properties} />
    )
  } else if (props.type === 'text') {
    return (
      <UTypo.Text {...props.colProps} {...props.properties}>
        {props.value}
      </UTypo.Text>
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

export default CellComponent
