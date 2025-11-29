import { UrpLink } from '../../components/Link/index.ts'

export default function OverView() {

  const components = [
    {
      href: 'http://127.0.0.1:3000/components/divider',
      content: 'Divider 分割线'
    },
    {
      href: 'http://127.0.0.1:3000/components/switch',
      content: 'Switch 开关'
    },
    {
      href: 'http://127.0.0.1:3000/components/button',
      content: 'Button 组件'
    },
    {
      href: 'http://127.0.0.1:3000/components/link',
      content: 'Link 链接'
    },
    {
      href: 'http://127.0.0.1:3000/components/input',
      content: 'Input 输入框'
    },
    {
      href: 'http://127.0.0.1:3000/components/checkbox',
      content: 'Checkbox 选择框'
    },
    {
      href: 'http://127.0.0.1:3000/components/transfer',
      content: 'Transfer 穿梭框'
    }
  ]

  return (
    <div>
      {
        components.map((component, index) => {
          return(
            <div key={index}>
              <UrpLink 
              prefixIcon="LinkOutlined" 
              underline='hover' 
              target='_self'
              href={component.href}
            >
              <span>{component.content}</span>
            </UrpLink>
            </div>
            
          )
        })
      }
    </div>
  )
}