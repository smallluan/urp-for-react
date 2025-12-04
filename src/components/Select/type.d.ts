export type Options = { lable: string, value: string | number }

export interface Select {
  value?: string | string[],
  defaultValue?: string | string[],
  options?: Options | Options[],
  multiple?: boolean
}
