import { SpaceProps } from "./type"

export const defaultProps: SpaceProps = {
  children: null,
  align: 'center',
  direction: 'horizontal',
  overflow: 'breakLine',
  gap: '8px',
  scrollBar: 'display',
  block: false,
}

export const formatProps = (props: Required<SpaceProps>) => {

  // 处理字符串类型的 gap
  const handleStringGap = (gap: string) => {
    gap = gap.trim()
    if (!gap) return '0px'
    const numberlize = Math.abs(Number(gap))
    if (!isNaN(numberlize)) return numberlize + 'px'
    if (CSS.supports('gap', gap)) {
      return gap
    }
    return '8px'
  }

  // 处理数字和字符串类型的 gap
  const handleStringOrNumberGap = (gap: string | number) => {
    if (typeof gap === 'string') {
      return handleStringGap(gap)
    } else if (typeof gap === 'number') {
      return Math.abs(gap) + 'px'
    }
    return '8px'
  }

  if (Array.isArray(props.gap)) {
    if (!props.gap.length) {
      props.gap = [0, 0]
    } else if (props.gap.length === 1) {
      props.gap[1] = props.gap[0]
    }
    props.gap = props.gap.slice(0, 2).map(item => {
      return handleStringOrNumberGap(item)
    })
  } else {
    props.gap = handleStringOrNumberGap(props.gap)
  }
  return props
}
