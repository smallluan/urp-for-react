import { Tag } from "./type"
import { defaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"

import "./style.less"
import genClassNameFromProps from "../utils/tools/className.ts"
import { useCallback, useMemo, useState } from "react"
import { USpace } from "../Space/index.ts"
import { UIcon } from "../Icon/index.ts"


const UTag = (props: Tag) => {
  // 合并属性
  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'children', 'content',
      'closeable', 'theme', 'shape', 'size',
      'prefixIcon', 'title', 'onClick', 'onClose'
    ]
  )

  const [isClose, setIsClose] = useState(false)


  // tag 类名 
  const tagClass = useMemo(() => {
    return genClassNameFromProps(
      {
        theme: _props.theme,
        size: _props.size,
        shape: _props.shape
      },
      'u-tag',
      'u-tag',
      _props.className
    )
  }, [_props.theme, _props.size, _props.shape, _props.className])


  // 鼠标悬浮时的 title
  const hoverTitle = useMemo(() => {

    if (typeof _props.title === 'boolean' && !_props.title) {
      return ''
    }

    if (typeof _props.title === 'string' &&_props.title) {
      return _props.title
    }

    if (typeof _props.children === 'string' && _props.children) {
      return _props.children
    }

    if (typeof _props.content === 'string' && _props.content) {
      return _props.content
    }

    return ''

  }, [_props.title, _props.children, _props.content])


  // 关闭按钮被点击
  const handleCloseIconClicked = useCallback(() => {
    _props.onClose?.()
    setIsClose(true)
  }, [_props.onClose])


  return (
    <>
      {
        !isClose &&
        <div
          className={tagClass}
          style={_props.style}
          title={hoverTitle}
          onClick={_props.onClick}
        >
          <USpace>
            {
              _props.prefixIcon &&
              <UIcon type={_props.prefixIcon} />
            }
            <div>{_props.children ?? _props.content}</div>
            {
              _props.closeable &&
              <UIcon
                onClick={handleCloseIconClicked}
                type="CloseOutlined"
              />
            }
          </USpace>
        </div>
      }
    </>
  )
}

export default UTag
