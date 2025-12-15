import React from 'react'
import { render, screen } from '@testing-library/react'
import UIcon from './Icon'

import '@testing-library/jest-dom'

// 测试组：Icon组件基础功能
describe('Icon Component', () => {

  // 测试1：默认属性渲染
  it('展示图标', () => {
    render(<UIcon type="SearchOutlined" />)
    
    // 验证图标渲染
    const iconElement = screen.getByTestId('u-icon')
    expect(iconElement).toBeInTheDocument()
    
    // 验证默认尺寸（默认size=16，对应style中的fontSize）
    expect(iconElement).toHaveStyle('font-size: 16px')
    
    // 验证默认类名
    expect(iconElement).toHaveClass('icon-custom')
  })

  // 测试2：自定义size和style属性生效
  it('自定义尺寸和颜色', () => {
    render(
      <UIcon 
        type="ArrowRightOutlined" 
        size={24} 
        style={{ color: '#f00', margin: '10px' }} 
      />
    )

    const iconElement = screen.getByTestId('u-icon')
    // 验证size转换为fontSize
    expect(iconElement).toHaveStyle('font-size: 24px')
    // 验证自定义颜色和边距
    expect(iconElement).toHaveStyle('color: rgb(255, 0, 0)')
    expect(iconElement).toHaveStyle('margin: 10px')
  })

  // 测试3：自定义className生效
  it('自定义类名', () => {
    render(<UIcon type="UserOutlined" className="test-icon-class" />)
    
    const iconElement = screen.getByTestId('u-icon')
    expect(iconElement).toHaveClass('icon-custom')
    expect(iconElement).toHaveClass('test-icon-class')
  })
})
