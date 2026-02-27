import { UTag } from "../../Tag/index.ts"
import { USwitch } from "../../Switch/index.ts"
import { USelect } from "../../Select/index.ts"
import { ULink } from "../../Link/index.ts"
import { UTypo } from "../../Typo/index.ts"
import { UInput } from "../../Input/index.ts"
import { UButton } from "../../Button/index.ts"
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
          onStateChange={(newValue) => {
            const nextData = genChangedData(newValue)
            props.setInnerData(nextData)
            props.onChange({
              changed: {
                index: props.position,
                value: {
                  oldValue: props.value,
                  newValue: newValue
                }
              },
              value: nextData
            })
          }}
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
          onChange={(newValue) => {
            const nextData = genChangedData(newValue)
            props.setInnerData(nextData)
            props.onChange({
              changed: {
                index: props.position,
                value: {
                  oldValue: props.value,
                  newValue: newValue
                }
              },
              value: nextData
            })
        }}
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
          onChange={(newValue) => {
            const nextData = genChangedData(newValue)
            props.setInnerData(nextData)
            props.onChange({
              changed: {
                  index: props.position,
                  value: {
                    oldValue: props.value,
                    newValue: newValue
                  }
                },
                value: nextData
            })
          }}
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
  } else if (props.type === 'button') {
    return (
      <UButton
        {...props.colProps}
        {...props.properties}
        onClick={
          () => {
            const data = {
              position: props.position,
              tableData: props.data,
              rowDate: props.data?.[props.position.rowIndex]
            }
            if (typeof props.properties.onClick === 'function') {
              props.properties.onClick(data)
            } else if (typeof props.colProps.onClick === 'function') {
              props.colProps.onClick(data)
            }
          }
        }
      />
    )
  } else if (props.type === 'title') {
    return (
      <UTypo.Title {...props.colProps} {...props.properties}>
        {props.value}
      </UTypo.Title>
    )
  } else if (props.type === 'description') {
    return (
      <UTypo.Description {...props.colProps} {...props.properties}>
        {props.value}
      </UTypo.Description>
    )
  } else {
    return (
      <div>未知组件</div>
    )
  }
}

export default CellComponent
