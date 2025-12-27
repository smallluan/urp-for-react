import { defaultProps } from "./properties.ts"
import { Avatar } from "./type"
import { UImage } from "../Image/index.ts"
import { UIcon } from "../Icon/index.ts"

import "./style.less"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { useMemo } from "react"
import genClassNameFromProps from "../utils/tools/className.ts"
import genStyleFromProps from "../utils/tools/style.ts"

const UAvatar = (props: Avatar) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'alt', 'className', 'icon', 'imageProps',
      'shape', 'size', 'src', 'style', 'text'
    ]
  )

  // 头像容器类名
  const avatarImageClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: _props.shape,
        size: _props.size
      },
      'u-avatar u-avatar-image',
      'u-avatar'
    ) + (_props.className ? ` ${_props.className}` : '')
  }, [_props.shape, _props.size, _props.className])

  // 头像容器类名
  const avatarTextClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: _props.shape,
        size: _props.size
      },
      'u-avatar u-avatar-text',
      'u-avatar'
    ) + (_props.className ? ` ${_props.className}` : '')
  }, [_props.shape, _props.size, _props.className])

  // 文字容器样式(主要处理文字字体自适应)
  const avatarTextStyle = useMemo(() => {
    const sizeMap = {
      'normal': 40,
      'small': 30,
      'large': 50,
    }
    let fontSize = sizeMap[_props.size] * 0.8 / _props.text.length

    if (_props.text.length === 1) {
      fontSize *= 0.8
    } else if (_props.text.length === 2) {
      fontSize *= 0.9
    }

    return genStyleFromProps(
      { fontSize: fontSize.toFixed(2) + 'px' }
    )
  }, [_props.size, _props.text])

  // 图标头像类
  const avatarIconClass = useMemo(() => {
    return genClassNameFromProps(
      {
        shape: _props.shape,
        size: _props.size
      },
      'u-avatar u-avatar-icon',
      'u-avatar'
    ) + (_props.className ? ` ${_props.className}` : '')
  }, [_props.shape, _props.size, _props.className])

  return (
    <>
      {
        _props.src && 
        <UImage 
          className={avatarImageClass}
          style={_props.style}
          {..._props.imageProps}
          src={_props.src}
          alt={_props.alt}
          shape={_props.shape}
        />
      }
      {
        (!_props.src && _props.text) &&
        <div 
          className={avatarTextClass}
          style={{...avatarTextStyle, ..._props.style}}
        >
          {_props.text}
        </div>
      }
      {
        (!_props.src && !_props.text && _props.icon) &&
        <div 
          className={avatarIconClass}
          style={_props.style}
        >
          <UIcon type={_props.icon} />
        </div>
      }
    </>
  )
}

export default UAvatar
