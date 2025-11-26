// 任意对象，这里 any 避免不了了，单独抽出来，只在这一个地方报错
export type NormalObject = Record<string, any>
export type SpicalObkect<T> = Record<T, any>

export enum Layout {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}
