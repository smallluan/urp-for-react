import { createBrowserRouter, RouterProvider  } from 'react-router-dom'

import Home from '../pages/home/index.tsx'
import OverView from '../pages/overview/index.tsx'

import DividerPage from '../pages/components/divider/index.tsx'
import SwitchPage from '../pages/components/switch/index.tsx'
import ButtonPage from '../pages/components/button/index.tsx'
import LinkPage from '../pages/components/link/index.tsx'
import InputPage from '../pages/components/input/index.tsx'
import SelectorPage from '../pages/components/checkbox/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: 'overview',
        element: <OverView/>
      },
      {
        path: 'components',
        children: [
          {
            index: true,
            path: 'button',
            element: <ButtonPage/>
          },
          {
            path: 'switch',
            element: <SwitchPage/>
          },
          {
            path: 'divider',
            element: <DividerPage/>
          },
          {
            path: 'link',
            element: <LinkPage/>
          },
          {
            path: 'input',
            element: <InputPage/>
          },
          {
            path: 'checkbox',
            element: <SelectorPage/>
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Home/>
  }
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
