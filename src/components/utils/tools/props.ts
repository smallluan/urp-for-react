import { useMemo } from "react"
import { NormalObject, SpicalObkect } from "../types"

export function useMergedProps<
  DefaultProps extends NormalObject,
  Props extends Partial<DefaultProps>,
  Field extends keyof DefaultProps
>(
  defaultProps: DefaultProps,
  props: Props,
  fields: Field[]
): {
  merged: Required<Pick<DefaultProps, Field>>
} {
  const pickedProps = fields.reduce((acc, field) => {
    acc[field] = props[field] ?? defaultProps[field]
    return acc
  }, {} as SpicalObkect<Field>)

  const deps = fields.map(fields => props[fields])

  const merged = useMemo(() => {
    return { ...defaultProps, ...pickedProps } as Required<Pick<DefaultProps, Field>>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { merged }
}
