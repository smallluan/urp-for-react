import { UOverlay } from "../Overlay/index.ts"
import { Dialog } from "./type"
import "./style.less"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { defaultProps } from "./properties.ts"
import { UButton } from "../Button/index.ts"
import { UGrid } from "../Grid/index.ts"
import { USpace } from "../Space/index.ts"
import { UIcon } from "../Icon/index.ts"

const themeToIcon = {
  default: null,
  primary: <UIcon size={20} style={{ color: 'var(--u-primary-color)' }} type="InfoCircleFilled" />,
  success: <UIcon size={20} style={{ color: 'var(--u-success-color)' }} type="CheckCircleFilled" />,
  warning: <UIcon size={20} style={{ color: 'var(--u-warning-color)' }} type="InfoCircleFilled" />,
  error: <UIcon size={20} style={{ color: 'var(--u-error-color)' }} type="CloseCircleFilled" />,
}

const UDialog = (props: Dialog) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'cancelBtn', 'confirmBtn',
      'closeBtn', 'visible', 'children', 'destoryOnClose',
      'zIndex', 'onCloseBtnClick', 'onConfirm', 'onCancel',
      'onOverlayClick', 'onEscKeydown', 'attachBody', 'width',
      'theme', 'title', 'content'
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
          style={{
            zIndex: _props.zIndex + 1,
            width: typeof(_props.width) === 'string' ? _props.width : _props.width + 'px'
          }}
          gap={16}
        >
          <UGrid.Row justify="space-between">
            <USpace align="center">
              {themeToIcon[_props.theme]}
              <div className="u-dialog-title">{_props.title}</div>
            </USpace>
            <UButton 
              content=""
              theme="default"
              variant="text"
              pureIcon
              icon="CloseOutlined"
              onClick={_props.onCloseBtnClick}
            />
          </UGrid.Row>
          
          <div className="u-dialog-content">{_props.children || _props.content}</div>
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
