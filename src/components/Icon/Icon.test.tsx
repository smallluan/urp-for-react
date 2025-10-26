import React from 'react'
import { render, screen } from '@testing-library/react'
import UrpIcon from './Icon'

// 测试组：Icon组件基础功能
describe('Icon Component', () => {

  // 测试1：默认属性渲染
  it('展示图标', () => {
    render(<UrpIcon type="SearchOutlined" />)
    
    // 验证图标渲染（Antd图标最终会渲染为svg）
    const iconElement = screen.getByTestId('urp-icon')
    expect(iconElement).toBeInTheDocument()
    
    // 验证默认尺寸（默认size=16，对应style中的fontSize）
    expect(iconElement).toHaveStyle('font-size: 16px')
    
    // 验证默认类名
    expect(iconElement).toHaveClass('icon-custom')
  })

  // 测试2：自定义size和style属性生效
  it('自定义尺寸和颜色', () => {
    render(
      <UrpIcon 
        type="ArrowRightOutlined" 
        size={24} 
        style={{ color: '#f00', margin: '10px' }} 
      />
    )

    const iconElement = screen.getByTestId('urp-icon')
    // 验证size转换为fontSize
    expect(iconElement).toHaveStyle('font-size: 24px')
    // 验证自定义颜色和边距
    expect(iconElement).toHaveStyle('color: rgb(255, 0, 0)')
    expect(iconElement).toHaveStyle('margin: 10px')
  })

  // 测试3：自定义className生效
  it('自定义类名', () => {
    render(<UrpIcon type="UserOutlined" className="test-icon-class" />)
    
    const iconElement = screen.getByTestId('urp-icon')
    expect(iconElement).toHaveClass('icon-custom')
    expect(iconElement).toHaveClass('test-icon-class')
  })

  // 测试4：支持所有Antd图标类型（以CheckOutlined为例）
  it('展示不同类别的图标', () => {
    render(<UrpIcon type="CheckOutlined" />)
    // 验证特定图标渲染（通过svg的data-icon属性，Antd图标会自带）
    const checkIcon = screen.getByTestId('urp-icon')
    expect(checkIcon).toHaveAttribute('data-icon', 'check') // CheckOutlined的data-icon为check
  })
})
