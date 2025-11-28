import { useMemo } from "react"
import { NormalObject, SpicalObject } from "../types"

export function useMergedProps<
  DefaultProps extends NormalObject,
  Props extends Partial<DefaultProps>,
  Field extends keyof DefaultProps,
  Handler extends (props: DefaultProps & SpicalObject<Field>) => Required<Pick<DefaultProps, Field>>
>(
  defaultProps: DefaultProps,
  props: Props,
  fields: Field[],
  handler?: Handler
): {
  merged: Required<Pick<DefaultProps, Field>>
} {
  const pickedProps = fields.reduce((acc, field) => {
    acc[field] = props[field] ?? defaultProps[field]
    return acc
  }, {} as SpicalObject<Field>)

  const deps = fields.map(fields => props[fields])

  const merged = useMemo(() => {
    return typeof handler === 'function' ?
           handler({ ...defaultProps, ...pickedProps }) :
           { ...defaultProps, ...pickedProps } as Required<Pick<DefaultProps, Field>>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { merged }
}
