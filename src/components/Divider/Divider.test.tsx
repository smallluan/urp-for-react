/** 单元测试文件 */
import React from "react"
import { render, screen } from '@testing-library/react'
import UrpDivider from "./Divider"

import '@testing-library/jest-dom'
import { Layout } from "../utils/types"

describe('Divider 组件', () => {
  // 测试默认渲染
  it('默认应该渲染为水平实线分割线', () => {
    render(<UrpDivider/>)

    const divider = screen.getByTestId('u-divider')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveClass('u-divider')
    
    const lineChild = divider.firstChild
    expect(lineChild).toHaveClass('u-line-layout-horizontal')
    expect(lineChild).not.toHaveClass('u-line-dashed')
  })

  // 测试水平分割线含有单一子元素的情况
  it('应该包含一个子元素', () => {
    const childText = '分割线内容'
    render(
      <UrpDivider>{ childText }</UrpDivider>
    )

    expect(screen.getByText(childText)).toBeInTheDocument()
  })

  // 测试水平分割线左右中布局: align = left | right | center
  it('水平分割线的左布局', () => {
    render(
      <UrpDivider align="left">分割线内容</UrpDivider>
    )

    const divider = screen.getByTestId('u-divider')
    expect(divider).toBeInTheDocument()
    // 左布局为例
    const lineLeft = divider.children[0]
    const lineRight = divider.children[2]
    expect(lineLeft).toHaveStyle('--flex: 1')
    expect(lineRight).toHaveStyle('--flex: 10')
  })

  // 测试垂直分割线
  it('垂直分割线基本布局', () => {
    render(
      <UrpDivider layout={Layout.VERTICAL}>
        <div>富强</div>
        <div>民主</div>
        <div>文明</div>
        <div>和谐</div>
      </UrpDivider>
    )

    const divider = screen.getByTestId('u-divider')
    expect(divider).toHaveClass('u-divider-vertical')

    const line = divider.firstChild?.childNodes[1]
    expect(line).toHaveClass('u-line-layout-vertical')
    expect(line).not.toHaveClass('u-line-dashed')
    expect(line).not.toHaveClass('u-line-slope')
  })

  // 测试垂直分割线 space 和 slope 属性，顺便测一下 dashed
  it('垂直分割线间距和倾斜线属性，以及虚线样式', () => {
    render(
      <UrpDivider layout={Layout.VERTICAL} space='100px' dashed slope>
        <div>爱国</div>
        <div>敬业</div>
        <div>诚信</div>
        <div>友善</div>
      </UrpDivider>
    )

    const divider = screen.getByTestId('u-divider')
    expect(divider).toHaveStyle('--space: 100px')
    
    const line = divider.firstChild?.childNodes[1]
    expect(line).toHaveClass('u-line-slope')
    expect(line).toHaveClass('u-line-dashed')
  })
})
