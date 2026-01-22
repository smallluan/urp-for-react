import QRCode from 'qrcode'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { QRCode as QRCodeType } from "./type"
import { defaultProps } from './properties.ts'
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { UImage } from "../Image/index.ts"
import { UOverlay } from "../Overlay/index.ts"
import "./style.less"
import genClassNameFromProps from '../utils/tools/className.ts'

const sizeWidth = {
  normal: 150,
  small: 100,
  large: 200
}

const UQRCode = (props: QRCodeType) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'borderless', 'size',
      'renderType', 'status', 'color', 'bgColor',
      'value', 'errorCorrectionLevel', 'icon', 'iconSize'
    ]
  )

  const canvasRef  = useRef(null)
  const [svgStr, setSvgStr] = useState('')

  /**
   * 生成 Canvas 二维码
   */
  const genCanvasQR = useCallback(() => {
    let width
    if (typeof _props.size === 'string') {
      width = sizeWidth[_props.size]
    } else if (typeof _props.size === 'number') {
      width = Math.abs(_props.size)
    }

    QRCode.toCanvas(canvasRef.current, _props.value, {
      errorCorrectionLevel: _props.errorCorrectionLevel,
      margin: 1.5,
      width: width,
      color: { dark: _props.color, light: _props.bgColor }
    }, (err) => {
      if (err) console.error(err)
    })
  }, [_props.value, _props.color, _props.bgColor, _props.size, _props.errorCorrectionLevel])

  /**
   * 生成 SVG 二维码
   */
  const genSVGQR = useCallback(() => {
    let width
    if (typeof _props.size === 'string') {
      width = sizeWidth[_props.size]
    } else if (typeof _props.size === 'number') {
      width = Math.abs(_props.size)
    }

    QRCode.toString(_props.value, {
      errorCorrectionLevel: _props.errorCorrectionLevel,
      type: 'svg',
      margin: 1.5,
      width: width,
      color: { dark: _props.color, light:  _props.bgColor }
    }, (err, svg) => {
      if (!err) setSvgStr(svg)
      else console.error(err)
    })
  }, [_props.value, _props.color, _props.bgColor, _props.size, _props.errorCorrectionLevel])

  useEffect(() => {
    if (_props.renderType === 'canvas') {
      genCanvasQR()
    } else {
      genSVGQR()
    }
  }, [_props.renderType])

  /**
   * 二维码类
   */
  const qrcodeClassName = useMemo(() => {
    return genClassNameFromProps(
      { borderless: _props.borderless },
      'u-qrcode',
      'u-qrcode',
      _props.className
    )
  }, [_props.borderless, _props.className])

  return (
    <div className={qrcodeClassName}>
      {
        _props.renderType === 'canvas' ?
        <canvas ref={canvasRef}/> :
        <div dangerouslySetInnerHTML={{__html: svgStr}}/>
      }
      {
        _props.icon &&
        <UImage
          className='u-qrcode-icon'
          style={{
            width: `${_props.iconSize}px`,
            height: `${_props.iconSize}px`,
          }}
          src={_props.icon}
        />
      }
      <UOverlay 
        attachBody={false}
        visible={_props.status !== 'active'}
      >
        
      </UOverlay>
    </div>
  )
}

export default UQRCode
