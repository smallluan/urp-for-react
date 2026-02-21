import { UDialog } from "../Dialog/index.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { defaultProps } from "./properties.ts"
import { DrawerProps } from "./type"
import "./style.less"
import { useMemo } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"

const UDrawer = (props: DrawerProps) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className',
      'style',
      'visible',
      'header',
      'footer',
      'attach',
      'children',
      'content',
      'closeBtn',
      'confirmBtn',
      'cancelBtn',
      'destroyOnClose',
      'position',
      'zIndex',
      'onConfirm',
      'onCancel',
      'onCloseBtnClick',
      'onClose',
      'onEscKeydown',
      'onOverlayClick'
    ]
  )

  const drawerClassName = useMemo(() => (
    genClassNameFromProps(
      {
        position: _props.position
      },
      "u-drawer",
      "u-drawer"
    )
  ), [_props.position])

  return (
    <UDialog
      title={_props.header}
      footer={_props.footer}
      width={['top', 'bottom'].includes(_props.position) ? '100vw' : '300px'}
      className={drawerClassName}
      visible={_props.visible}
      cancelBtn={_props.cancelBtn}
      confirmBtn={_props.confirmBtn}
      closeBtn={_props.closeBtn}
      destoryOnClose={_props.destroyOnClose}
      zIndex={_props.zIndex}
      onCancel={_props.onCancel}
      onOverlayClick={_props.onOverlayClick}
      onCloseBtnClick={_props.onCloseBtnClick}
      onConfirm={_props.onConfirm}
      onEscKeydown={_props.onEscKeydown}
    >
      {_props.children || _props.content}
    </UDialog>
  )
}

export default UDrawer
