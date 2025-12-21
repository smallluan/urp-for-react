import { Popconfirm } from "./type"
import { UPopup } from "../Popup/index.ts"
import { useCallback, useMemo, useRef, useState } from "react"
import useClickOutside from "../utils/hooks/useClickOutside.ts"
import "./style.less"
import { UIcon } from "../Icon/index.ts"
import { UTypo } from "../Typo/index.ts"
import { USpace } from "../Space/index.ts"
// import { UGrid } from "../Grid/index.ts"
import { UButton } from "../Button/index.ts"
import genClassNameFromProps from "../utils/tools/className.ts"

const UPopconfirm = (props: Popconfirm) => {

  const isControlled = props.visible !== undefined
  const [innerVisible, setInnerVisible] = useState(props.defaultVisible ?? false)
  const visible = isControlled ? props.visible : innerVisible

  const childrenRef = useRef(null)
  const popconfirmRef = useRef(null)

  useClickOutside(
    childrenRef,
    () => setInnerVisible(false),
    {
      ignoreRefs: [popconfirmRef]
    }
  )

  const handleChildrenClick = useCallback(() => {
    setInnerVisible(prev => !prev)
  }, [])

  const handleCancel = useCallback(() => {
    setInnerVisible(false)
    props.onCancel?.()
  }, [props.onCancel])

  const handleConfirm = useCallback(() => {
    setInnerVisible(false)
    props.onConfirm?.()
  }, [props.onConfirm])

  const iconClass = useMemo(() => {
    return genClassNameFromProps(
      { theme: props.theme || 'primary' },
      'u-popupconfirm-icon',
      'u-popupconfirm-icon'
    )
  }, [props.theme])

  return (
    <UPopup
      trigger="click"  // 考虑到使用场景为二次确认，所以这里触发条件限制为点击
      onChange={props.onVisibleChange}
    >
      {/* 被挂载的元素 */}
      <div
        ref={childrenRef}
        onClick={handleChildrenClick}
      >
        {props.children}
      </div>
      {/* popup 内容 */}
      <UPopup.Content
        style={{ width: '200px' }}
        arrow={props.arrow}
        position={props.position || 'top'}
        visible={visible}
      >
        {/* 实际内容 */}
        <div 
          ref={popconfirmRef}  // 保存 ref，防止 useClickOutside 导致的弹层消失
          className="u-popconfirm-content"
        >
          <div className="u-popconfirm-content-title">
            <USpace direction="vertical" gap={8}>
              <USpace direction="horizontal" gap={8}>
                {
                  props.icon &&
                  <UIcon type={props.icon} className={iconClass} />
                }
                <UTypo.Text>{props.title}</UTypo.Text>
              </USpace>
              {
                props.description &&
                <UTypo.Description>{props.description}</UTypo.Description>
              }
              <USpace style={{ display: 'flex', justifyContent: 'flex-end' }} gap={8}>
                <UButton onClick={handleCancel} theme="default" size="small" content="取消" />
                <UButton onClick={handleConfirm} theme={props.theme || 'primary'} size="small" content="确认" />
              </USpace>
            </USpace>

          </div>
        </div>
      </UPopup.Content>
    </UPopup>
  )
}

export default UPopconfirm
