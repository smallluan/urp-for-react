import { UOverlay } from "../Overlay/index.ts"
import { Dialog } from "./type"
import "./style.less"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { defaultProps } from "./properties.ts"
import { UButton } from "../Button/index.ts"
import { UGrid } from "../Grid/index.ts"
import { USpace } from "../Space/index.ts"

const UDialog = (props: Dialog) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'cancelBtn', 'confirmBtn',
      'closeBtn', 'visible', 'children', 'destoryOnClose',
      'zIndex', 'onCloseBtnClick', 'onConfirm', 'onCancel',
      'onOverlayClick', 'onEscKeydown', 'attachBody'
    ]
  )

  return (
    <UOverlay
      destoryOnClose={_props.destoryOnClose}
      visible={_props.visible}
      zIndex={_props.zIndex}
      onClick={_props.onOverlayClick}
      attachBody={_props.attachBody}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <USpace
          direction="vertical"
          align="start"
          className="u-dialog"
          style={{zIndex: _props.zIndex + 1}}
          gap={16}
        >
          <UGrid.Row justify="space-between">
            <div className="u-dialog-title">标题文字</div>
            <UButton 
              content=""
              theme="default"
              variant="text"
              pureIcon
              icon="CloseOutlined"
              onClick={_props.onCloseBtnClick}
            />
          </UGrid.Row>
          
          <div className="u-dialog-content">{_props.children}</div>
          <UGrid.Row justify="flex-end">
            <USpace style={{width: 'fit-content'}}>
              <UButton
                content="取消"
                theme="default"
                onClick={_props.onCancel}
              />
              <UButton
                content="确认"
                onClick={_props.onConfirm}
              />
            </USpace>
          </UGrid.Row>
        </USpace>
      </div>
      
    </UOverlay>
  )
}

export default UDialog
