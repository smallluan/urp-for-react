/** 单元测试文件 */
import React from "react"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UrpSwitch from './Switch'
import '@testing-library/jest-dom'

describe('Switch 组件', () => {
  // 测试默认渲染
  it('渲染默认 Switch 组件', async () => {
    const user = userEvent.setup()
    render(<UrpSwitch/>)
    // 默认状态
    const urpSwitch = screen.getByTestId('urp-switch')
    expect(urpSwitch).toBeInTheDocument()
    expect(urpSwitch).toHaveClass('urp-switch')
    expect(urpSwitch).toHaveClass('urp-switch-state-close')
    expect(urpSwitch).toHaveClass('urp-switch-shape-around')
    expect(urpSwitch).toHaveClass('urp-switch-size-normal')
    expect(urpSwitch).not.toHaveClass('urp-switch-state-open')
    expect(urpSwitch).not.toHaveClass('urp-switch-disabled')
    // 模拟点击开关
    await user.click(urpSwitch)
    expect(urpSwitch).toHaveClass('urp-switch-state-open')
    expect(urpSwitch).not.toHaveClass('urp-switch-state-close')
  })
  // 测试方形 Switch
  it('方形 Switch', () => {
    render(<UrpSwitch shape="react" />)
    const urpSwitch = screen.getByTestId('urp-switch')
    expect(urpSwitch).toBeInTheDocument()
    expect(urpSwitch).toHaveClass('urp-switch-shape-react')
  })
  // 测试禁用状态
  it('禁用状态点击无效', async () => {
    const user = userEvent.setup()
    render(<UrpSwitch disabled />)
    const urpSwitch = screen.getByTestId('urp-switch')
    expect(urpSwitch).toBeInTheDocument()
    expect(urpSwitch).toHaveClass('urp-switch-state-close')
    await user.click(urpSwitch)
    expect(urpSwitch).toHaveClass('urp-switch-state-close')
  })
  // 测试 loading
  it('加载状态', async () => {
    const user = userEvent.setup()
    render(<UrpSwitch loading disabled={false} />)
    const urpSwitch = screen.getByTestId('urp-switch')
    expect(urpSwitch).toBeInTheDocument()
    expect(urpSwitch).toHaveClass('urp-switch-state-close')
    // 即使 disabled 属性赋值为 false，但是由于 loading 的存在依旧不能点击
    await user.click(urpSwitch)
    expect(urpSwitch).toHaveClass('urp-switch-state-close')
    // 验证 loading 图标是否存在且唯一
    const allLoadingSvgs = urpSwitch.querySelectorAll('svg[data-icon="loading"]')
    expect(allLoadingSvgs).toHaveLength(1)
  })
  // 测试滑块内置描述
  it('内置描述生效', async () => {
    const user = userEvent.setup()
    render(<UrpSwitch desc={['开', '关']} />)
    const urpSwitch = screen.getByTestId('urp-switch')
    expect(urpSwitch).toBeInTheDocument()
    // 查看关闭状态下滑块内部是否显示正确的描述文字
    const closeText = urpSwitch.querySelector('.urp-desc-inner')
    expect(closeText).toHaveTextContent('关')
    // 打开开关
    await user.click(urpSwitch)
    // 查看打开状态下滑块内部是否显示正确的描述文字
    const openText = urpSwitch.querySelector('.urp-desc-inner')
    expect(openText).toHaveTextContent('开')
  })
  // 测试滑块外部描述
  it('外置描述生效', async () => {
    const user = userEvent.setup()
    render(<UrpSwitch descPos="outer" desc={['开', '关']} />)
    const urpSwitch = screen.getByTestId('urp-switch')
    expect(urpSwitch).toBeInTheDocument()
    // 查看关闭状态下滑块外部是否显示正确的描述文字
    const closeText = urpSwitch.querySelector('.urp-desc-outer')
    expect(closeText).toHaveTextContent('关')
    // 打开开关
    await user.click(urpSwitch)
    // 查看打开状态下滑块外部是否显示正确的描述文字
    const openText = urpSwitch.querySelector('.urp-desc-outer')
    expect(openText).toHaveTextContent('开')
  })
})
