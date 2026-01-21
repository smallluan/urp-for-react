/**
 * 将色值面板中指示器的坐标转化为饱和度 s 和明度 v
 * @param panelWidth 
 * @param panelHeight 
 * @param indicationPos 
 * @returns 
 */
export const positionToSv = (
  panelWidth: number,
  panelHeight: number,
  indicationPos: { x: number, y: number },
) => {
  let s = indicationPos.x / panelWidth
  let v = 1 - (indicationPos.y / panelHeight)

  s = Math.max(0, Math.min(1, s))
  v = Math.max(0, Math.min(1, v))

  return { s, v }
}


/**
 * 将 hsv 转化为 rgb
 * @param h - 色相
 * @param s - 饱和度
 * @param v - 亮度
 * @returns rgb
 */
export const hsvToRgb = (
  h: number,  // 色相
  s: number,  // 饱和度
  v: number  // 亮度
) => {

  h = h % 360
  if (h < 0) h += 360

  // 饱和度为 0 时是灰色度
  if (s === 0) {
    const gray = Math.round(v * 255)
    return { r: gray, g: gray, b: gray }
  }

  h = h / 60
  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - s * f)
  const t = v * (1 - s * (1- f))

  let r = 0, g = 0, b = 0
  switch (i) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    case 5: r = v; g = p; b = q; break
    default: break
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}


/**
 * HSV 颜色转换为标准 Hex 十六进制颜色
 * @param h - 色相
 * @param s - 饱和度
 * @param v - 明度
 * @returns Hex 颜色字符串
 */
export const hsvToHex = (h: number, s: number, v: number) => {
  // HSV → RGB
  const { r, g, b } = hsvToRgb(h, s, v)

  // 确保 R/G/B 在 0~255 之间并取整
  const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)))
  const red = clamp(r)
  const green = clamp(g)
  const blue = clamp(b)

  // 十进制转两位十六进制（不足两位补 0）
  const toTwoDigitHex = (value: number) => value.toString(16).padStart(2, '0')
  const rr = toTwoDigitHex(red)
  const gg = toTwoDigitHex(green)
  const bb = toTwoDigitHex(blue)

  // 3. 拼接为标准 Hex 格式并返回
  return `#${rr}${gg}${bb}`.toUpperCase()
}


/**
 * 从 rgb 字符串中提取三个颜色的值
 * @param rgbStr - rgb(255, 255, 255)
 * @returns 提取的数组（如果提取失败默认是纯白）
 */
export const extractRgbValues = (
  rgbStr: string
): [number, number, number] => {
  const rgbRegex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i
  const matchRes = rgbStr.match(rgbRegex)

  if (!matchRes || matchRes.length !== 4) {
    return [255, 255, 255]
  }

  const [, rStr, gStr, bStr] = matchRes
  const r = Math.max(0, Math.min(Number(rStr), 255))
  const g = Math.max(0, Math.min(Number(gStr), 255))
  const b = Math.max(0, Math.min(Number(bStr), 255))

  return [r, g, b]
}

