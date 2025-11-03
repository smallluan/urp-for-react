/** 单元测试文件 */
import { render, screen } from '@testing-library/react'
import UrpLink from './Link'
import '@testing-library/jest-dom'

describe('Link 组件', () => {
  it('默认渲染 Link 组件', () => {
    render(<UrpLink/>)
    const urpLink = screen.getByTestId('urp-link')

    expect(urpLink).toBeInTheDocument()
    expect(urpLink).toHaveClass('urp-link')
    expect(urpLink).toHaveClass('urp-link-theme-primary')
    expect(urpLink).toHaveClass('urp-link-underline-display')
    expect(urpLink).toHaveClass('urp-link-size-normal')
    expect(urpLink).not.toHaveClass('urp-link-disabled')
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
    const urpLinks = screen.getAllByTestId('urp-link')

    expect(urpLinks[0]).toHaveClass('urp-link-theme-default')
    expect(urpLinks[1]).toHaveClass('urp-link-theme-warning')
    expect(urpLinks[2]).toHaveClass('urp-link-theme-success')
    expect(urpLinks[3]).toHaveClass('urp-link-theme-error')
  })

  it('测试尺寸', () => {
    render(
      <>
        <UrpLink size='small'/>
        <UrpLink size='large'/>
      </>
    )
    const urpLinks = screen.getAllByTestId('urp-link')
    
    expect(urpLinks[0]).toHaveClass('urp-link-size-small')
    expect(urpLinks[1]).toHaveClass('urp-link-size-large')
  })

  it('测试图标渲染', () => {
    render(
      <>
        <UrpLink prefixIcon='LinkOutlined' />
        <UrpLink suffixIcon='LinkOutlined' />
      </>
    )
    const urpLinks = screen.getAllByTestId('urp-link')

    expect(urpLinks[0].querySelectorAll('svg[data-icon="link"]')).toHaveLength(1)
    let container = urpLinks[0].firstChild
    expect(container?.firstChild?.firstChild?.nodeName).toBe('svg')

    expect(urpLinks[1].querySelectorAll('svg[data-icon="link"]')).toHaveLength(1)
    container = urpLinks[1].firstChild
    expect(container?.childNodes[1]?.firstChild?.nodeName).toBe('svg')
  })
})