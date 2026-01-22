import QRCode from 'qrcode'
import { useCallback, useEffect, useRef, useState } from 'react'
import { QRCode as QRCodeType } from "./type"
import { defaultProps } from './properties.ts'
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import "./style.less"

const UQRCode = (props: QRCodeType) => {

  const { merged: _props } = useMergedProps(
    defaultProps,
    props,
    [
      'className', 'style', 'borderless', 'size',
      'renderType', 'status', 'color', 'bgColor',
      'value'
    ]
  )

  const canvasRef  = useRef(null)
  const [svgStr, setSvgStr] = useState('')

  /**
   * 生成 Canvas 二维码
   */
  const genCanvasQR = useCallback(() => {
    QRCode.toCanvas(canvasRef.current, _props.value, {
      width: 200,
      color: { dark: _props.color, light: _props.bgColor }
    }, (err) => {
      if (err) console.error(err)
    })
  }, [_props.value, _props.color, _props.bgColor])

  /**
   * 生成 SVG 二维码
   */
  const genSVGQR = useCallback(() => {
    QRCode.toString(_props.value, {
      type: 'svg',
      width: 200,
      color: { dark: _props.color, light:  _props.bgColor }
    }, (err, svg) => {
      if (!err) setSvgStr(svg)
      else console.error(err)
    })
  }, [_props.value, _props.color, _props.bgColor])

  useEffect(() => {
    if (_props.renderType === 'canvas') {
      genCanvasQR()
    } else {
      genSVGQR()
    }
  }, [_props.renderType])

  return (
    <>
      {
        _props.renderType === 'canvas' ?
        <canvas ref={canvasRef}/> :
        <div dangerouslySetInnerHTML={{__html: svgStr}}/>
      }
    </>
    
  )
}

export default UQRCode
