import QRCode from 'qrcode'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { QRCode as QRCodeType } from "./type"
import { defaultProps } from './properties.ts'
import useMergedProps from "../utils/hooks/useMergedProps.ts"
import { UImage } from "../Image/index.ts"
import { UOverlay } from "../Overlay/index.ts"
import "./style.less"
import genClassNameFromProps from '../utils/tools/className.ts'
import { ULoading } from "../Loading/index.ts"
import { UIcon } from "../Icon/index.ts" 
import USpace from '../Space/Space.tsx'

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
      'value', 'errorCorrectionLevel', 'icon', 'iconSize',
      'onRefresh'
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
  }, [_props.renderType, _props.status, _props.errorCorrectionLevel, _props.size])

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
      {/* 加载状态 */}
      <ULoading
        attachBody={false}
        visible={_props.status === 'loading'}
        className='u-qrcode-overlay'
        showOverlay={false}
      />
      {/* 已扫描 */}
      <UOverlay
        attachBody={false}
        visible={_props.status === 'scanned'}
        className='u-qrcode-overlay'
      >
        <USpace className='u-qrcode-scanned'>
          <UIcon type='CheckCircleFilled'/>
          <div className='u-qrcode-scanned-text'>已扫描</div>
        </USpace>
      </UOverlay>
      {/* 已过期 */}
      <UOverlay
        attachBody={false}
        visible={_props.status === 'expired'}
        className='u-qrcode-overlay'
      >
        <USpace className='u-qrcode-expired' direction='vertical'>
          <USpace className='u-qrcode-expired-space'>
            <UIcon type='CloseCircleFilled'/>
            <div className='u-qrcode-expired-text'>二维码已过期</div>
          </USpace>
          <USpace className='u-qrcode-expired-space'>
            <UIcon
              type='RedoOutlined'
              className='reload-icon'
              style={{color: 'var(--u-primary-color)'}}
              onClick={_props.onRefresh}
            />
            <div
              onClick={_props.onRefresh}
              className='reload-text'
            >
              <span>重新获取</span>
            </div>
          </USpace>
        </USpace>
      </UOverlay>
    </div>
  )
}

export default UQRCode
