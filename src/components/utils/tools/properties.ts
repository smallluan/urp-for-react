import { NormalObject } from '../types/index'

/**
 * 从一个属性 props 中，取出数组 neededCodes所需要的部分
 * @param props - 原 props 对象
 * @param neededCodes - 需要取出的字段数组
 * @returns - 提取后的对象
 */
export function getPartialProps<T extends NormalObject>(
  props: T,
  neededCodes: Array<keyof T>
) {
  if (props === undefined) return {} as Pick<T, never>

  const partialProps = {} as Pick<T, (typeof neededCodes)[number]>
  neededCodes.forEach(code => {
    partialProps[code] = props[code]
  })

  return partialProps
}
