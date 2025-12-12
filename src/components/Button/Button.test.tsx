/** 单元测试文件 */
import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UrpButton from './Button'
import '@testing-library/jest-dom'

describe('Button 组件', () => {
  // 测试默认渲染
  it('默认渲染 Button 组件', async () => {
    const user = userEvent.setup()
    render(<UrpButton/>)

    const urpButton = screen.getByTestId('u-button')
    let activeBgEl = urpButton.querySelector('u-button-active-bg')
    
    expect(urpButton).toBeInTheDocument()
    expect(urpButton).toHaveClass('u-button')
    expect(urpButton).toHaveClass('u-button-theme-primary')
    expect(activeBgEl).toBeNull()
    
    await user.click(urpButton)
    activeBgEl = await waitFor(() => {
      const el = urpButton.querySelector('.u-button-active-bg')
      if (!el) throw new Error('active bg not found')
      return el as HTMLElement
    })
    expect(activeBgEl).toBeInTheDocument()
    setTimeout(() => {
      expect(activeBgEl).not.toBeInTheDocument()
    }, 250)
  })

  // 测试不同主题的按钮
  it('测试主题渲染', () => {
    render(
      <>
        <UrpButton/>
        <UrpButton theme='warning' />
        <UrpButton theme='success' />
        <UrpButton theme='error' />
      </>
    )
    const urpButtons = screen.getAllByTestId('u-button')

    expect(urpButtons[0]).toHaveClass('u-button-theme-primary')
    expect(urpButtons[1]).toHaveClass('u-button-theme-warning')
    expect(urpButtons[2]).toHaveClass('u-button-theme-success')
    expect(urpButtons[3]).toHaveClass('u-button-theme-error')
  })

  // 测试不同变种
  it('测试变种按钮', () => {
    render(
      <>
        <UrpButton/>
        <UrpButton variant='outline' />
        <UrpButton variant='dashed' />
        <UrpButton variant='text' />
      </>
    )
    const urpButtons = screen.getAllByTestId('u-button')

    expect(urpButtons[0]).toHaveClass('u-button-variant-base')
    expect(urpButtons[1]).toHaveClass('u-button-variant-outline')
    expect(urpButtons[2]).toHaveClass('u-button-variant-dashed')
    expect(urpButtons[3]).toHaveClass('u-button-variant-text')
  })

  // 测试禁用
  it('测试禁用效果：点击后禁用，再次点击失效', async () => {
    const user = userEvent.setup()
    let clickCount = 0
    const ButtonWithCount = () => {
      const [disabled, setDisabled] = useState(false)
      
      const handleClick = () => {
        clickCount ++ // 记录点击次数
        setDisabled(true)
      }
      
      return <UrpButton onClick={handleClick} disabled={disabled} />
    }
    
    render(<ButtonWithCount />)
    const urpButton = screen.getByTestId('u-button')
    
    expect(urpButton).not.toBeDisabled()
    // 第一次点击：计数+1，按钮禁用
    await user.click(urpButton)
    expect(clickCount).toBe(1)
    expect(urpButton).toBeDisabled()
    
    // 第二次点击：按钮禁用，计数不变
    await user.click(urpButton)
    expect(clickCount).toBe(1)
  })

  // 测试加载效果
  it('测试加载状态', async () => {
    const user = userEvent.setup()
    let clickCount = 0
    const ButtonWithCount = () => {
      const [loading, setLoading] = useState(false)
      
      const handleClick = () => {
        clickCount ++ // 记录点击次数
        setLoading(true)
      }
      
      return <UrpButton onClick={handleClick} loading={loading} />
    }

    render(<ButtonWithCount />)
    const urpButton = screen.getByTestId('u-button')
    
    expect(urpButton).not.toBeDisabled()
    // 第一次点击：计数+1，按钮禁用
    await user.click(urpButton)
    expect(clickCount).toBe(1)
    expect(urpButton).toBeDisabled()
    
    // 第二次点击：按钮禁用，计数不变
    await user.click(urpButton)
    expect(clickCount).toBe(1)

    const loadingIcon = urpButton.querySelectorAll('svg[data-icon="loading"]')
    expect(loadingIcon).toHaveLength(1)
  })
})
