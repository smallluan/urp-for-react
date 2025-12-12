/** 单元测试文件 */
import { render, screen } from '@testing-library/react'
import UrpLink from './Link'
import '@testing-library/jest-dom'

describe('Link 组件', () => {
  it('默认渲染 Link 组件', () => {
    render(<UrpLink/>)
    const urpLink = screen.getByTestId('u-link')

    expect(urpLink).toBeInTheDocument()
    expect(urpLink).toHaveClass('u-link')
    expect(urpLink).toHaveClass('u-link-theme-primary')
    expect(urpLink).toHaveClass('u-link-underline-display')
    expect(urpLink).toHaveClass('u-link-size-normal')
    expect(urpLink).not.toHaveClass('u-link-disabled')
  })

  it('测试主题样式渲染', () => {
    render(
      <>
        <UrpLink theme='default' />
        <UrpLink theme='warning' />
        <UrpLink theme='success' />
        <UrpLink theme='error' />
      </>
    )
    const urpLinks = screen.getAllByTestId('u-link')

    expect(urpLinks[0]).toHaveClass('u-link-theme-default')
    expect(urpLinks[1]).toHaveClass('u-link-theme-warning')
    expect(urpLinks[2]).toHaveClass('u-link-theme-success')
    expect(urpLinks[3]).toHaveClass('u-link-theme-error')
  })

  it('测试尺寸', () => {
    render(
      <>
        <UrpLink size='small'/>
        <UrpLink size='large'/>
      </>
    )
    const urpLinks = screen.getAllByTestId('u-link')
    
    expect(urpLinks[0]).toHaveClass('u-link-size-small')
    expect(urpLinks[1]).toHaveClass('u-link-size-large')
  })

  it('测试图标渲染', () => {
    render(
      <>
        <UrpLink prefixIcon='LinkOutlined' />
        <UrpLink suffixIcon='LinkOutlined' />
      </>
    )
    const urpLinks = screen.getAllByTestId('u-link')

    expect(urpLinks[0].querySelectorAll('svg[data-icon="link"]')).toHaveLength(1)
    let container = urpLinks[0].firstChild
    expect(container?.firstChild?.firstChild?.nodeName).toBe('svg')

    expect(urpLinks[1].querySelectorAll('svg[data-icon="link"]')).toHaveLength(1)
    container = urpLinks[1].firstChild
    expect(container?.childNodes[1]?.firstChild?.nodeName).toBe('svg')
  })

  it('测试链接禁用', () => {
    render(
      <UrpLink href="https://tdesign.tencent.com/" disabled />
    )
    const urpLink = screen.getByTestId('u-link')

    expect(urpLink).toHaveClass('u-link-disabled')
  })
})
