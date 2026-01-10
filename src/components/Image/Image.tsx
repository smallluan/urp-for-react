import { Image } from "./type"
import { defaultProps } from "./properties.ts"
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { useMemo, useRef, useState } from "react"
import genStyleFromProps from "../utils/tools/style.ts"

import "./style.less"
import genClassNameFromProps from "../utils/tools/className.ts"

const UImage = (props: Image) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'alt', 'src', 'objectFit', 'objectPosition',
      'lazy', 'shape', 'loading', 'error', 'fallback',
      'overlayContent', 'overlayTrigger', 'onError', 'onLoad'
    ]
  )

  /**
   * 这里没有使用 useEffect 通过 dom 去挂载 onLoad 和 onError 事件
   * 这是因为 useEffect 事件是在组件首次渲染完之后触发
   * 而对于加载极快的图片（比如缓存的图片），img 标签的 load 事件过早触发
   * 此时 useEffect 还未执行，事实上加载完之后不会触发对应的处理函数
   * 导致 isLoading 的状态得不到更新，会同时存在加载占位元素和图片
   * 解决方法是直接将对应的 handler 放到 img 的原生属性中。
   */

  const imgRef = useRef<HTMLImageElement>(null)
  // 是否已经因为加载失败而切换成备用图片，防止无限 error
  const hasUseFallback = useRef(false)
  const [loadFail, setLoadFail] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isHover, setIsHover] = useState(false)

  /**
   * 图片加载失败回调
   * @description - 图片加载失败之后会自动将 fallback 作为备用 src 
   *              - 为了防止备用 src 也同样失效，造成无限调用 onError
   *              - 这里做了对应的处理，如果备用图片也加载失败，不再触发 onError
   */
  const handleLoadError = () => {
    const imgDom = imgRef.current
    if (!imgDom) return

    if (_props.fallback && !hasUseFallback.current) {
      console.warn(`原 src ${_props.src} 加载失败，已切换为备用图片。`)
      hasUseFallback.current = true
      imgDom.src = _props.fallback
    }

    setLoadFail(true)
    setIsLoading(false)
    _props.onError?.()
  }

  // 加载成功回调
  const handleLoadSuccess = () => {
    setLoadFail(false)
    setIsLoading(false)
    _props.onLoad?.()
  }

  // 图片容器类名
  const imgContainerClass = useMemo(() => {
    return genClassNameFromProps(
      { shape: _props.shape },
      "u-image",
      "u-image"
    ) + (_props.className ? ` ${_props.className}` : '')
  }, [_props.shape, _props.className])

  // 图片样式
  const imgStyle = useMemo(() => {
    return genStyleFromProps(
      { 
        objectFit: _props.objectFit,
        objectPosition: _props.objectPosition
      }
    )
  }, [_props.objectFit, _props.objectPosition])

  return (
    <div
      className={imgContainerClass}
      style={_props.style}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      { isLoading && _props.loading }
      {
        loadFail ?
        _props.error : 
        <img
          ref={imgRef}
          src={_props.src} 
          alt={_props.alt}
          loading={_props.lazy ? 'lazy' : 'eager'}
          onLoad={handleLoadSuccess}
          onError={handleLoadError}
          style={imgStyle}
        />
      }
      { 
        (
          (
            typeof _props.overlayTrigger === 'boolean' &&
            _props.overlayTrigger
          ) ||
          _props.overlayTrigger === 'always' ||
          (
            _props.overlayContent && !loadFail && 
           _props.overlayTrigger === 'hover' && isHover
          )
        ) &&
        <div className="u-overlay">
          { _props.overlayContent }
        </div>
      }
    </div>
  )
}

export default UImage
