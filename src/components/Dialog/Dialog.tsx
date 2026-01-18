import { UOverlay } from "../Overlay/index.ts"
import { Dialog } from "./type"
import "./style.less"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { defaultProps } from "./properties.ts"
import { UButton } from "../Button/index.ts"
import { UGrid } from "../Grid/index.ts"
import { USpace } from "../Space/index.ts"
import { UIcon } from "../Icon/index.ts"
import { useCallback, useEffect } from "react"

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
      'theme', 'title', 'content', 'footer'
    ]
  )

  /**
   * 监听 keyDown 
   */
  useEffect(() => {
    const handleEscDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        _props.onEscKeydown?.()
      }
    }

    window.addEventListener('keydown', handleEscDown)

    return () => window.removeEventListener('keydown', handleEscDown)
  }, [_props.onEscKeydown])

  /**
   * 渲染 footer 部分
   */
  const renderFooter = useCallback(() => {
    const { cancelBtn, confirmBtn, footer, onConfirm, onCancel } = _props

    const genBtn = (
      config: Dialog['confirmBtn'],
      defaultContent: React.ReactNode,
      defaultTheme: Dialog['theme'],
      onClick: () => void
    ) => {
      if (typeof config === 'boolean') {
        if (config) {
          return (
            <UButton
              content={defaultContent}
              theme={defaultTheme}
              onClick={onClick}
            />
          )
        }
      } else if (typeof config === 'string') {
        return (
          <UButton
            content={config}
            theme={defaultTheme}
            onClick={onClick}
          />
        )
      } else if (typeof config === 'object') {
        return (
          <UButton {...config} />
        )
      }
      return null
    }

    return (
      <UGrid.Row justify="flex-end">
        <USpace style={{ width: 'fit-content' }}>
          {footer}
          {genBtn(cancelBtn, '取消', 'default', onCancel) }
          {genBtn(confirmBtn, '确认', 'primary', onConfirm)}
        </USpace>
      </UGrid.Row>
    )
  }, [_props.cancelBtn, _props.confirmBtn, _props.footer])

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
          {renderFooter()}
        </USpace>
      </div>
      
    </UOverlay>
  )
}

export default UDialog
