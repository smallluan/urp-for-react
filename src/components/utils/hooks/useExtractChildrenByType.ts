import React, { ReactElement, ReactNode, ElementType } from "react"

/**
 * 从 React children 中提取指定类型的子元素
 * @param children - children 集合
 * @param targetType - 要提取的元素类型
 * @returns - 类型匹配的子元素数组
 */
export default function useExtractChildrenByType<P = Record<string, unknown>, T extends ElementType = ElementType>(
  children: ReactNode,
  targetType: T
): ReactElement<P, T>[] {
  const matchedChildren: ReactElement<P, T>[] = []

  React.Children.forEach(children, (child) => {

    if (!React.isValidElement(child)) {
      return
    }

    const isTypeMatch = child.type === targetType

    if (isTypeMatch) {
      matchedChildren.push(child as ReactElement<P, T>)
    }

  })

  return matchedChildren
}
