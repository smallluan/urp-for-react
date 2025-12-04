import { createBrowserRouter, RouterProvider  } from 'react-router-dom'

import Home from '../pages/home/index.tsx'
import OverView from '../pages/overview/index.tsx'

import DividerPage from '../pages/components/divider/index.tsx'
import SwitchPage from '../pages/components/switch/index.tsx'
import ButtonPage from '../pages/components/button/index.tsx'
import LinkPage from '../pages/components/link/index.tsx'
import InputPage from '../pages/components/input/index.tsx'
import SelectorPage from '../pages/components/checkbox/index.tsx'
import TransferPage from '../pages/components/transfer/index.tsx'
import SpacePage from '../pages/components/space/index.tsx'
import GridPage from '../pages/components/grid/index.tsx'
import LayoutPage from '../pages/components/layout/index.tsx'
import SelectPage from '../pages/components/select/index.tsx'
import PopupPage from '../pages/components/popup/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: 'overview',
        element: <OverView/>,
        children: [
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
              },
              {
                path: 'transfer',
                element: <TransferPage/>
              },
              {
                path: 'space',
                element: <SpacePage/>
              },
              {
                path: 'grid',
                element: <GridPage/>
              },
              {
                path: 'layout',
                element: <LayoutPage/>
              },
              {
                path: 'select',
                element: <SelectPage/>
              },
              {
                path: 'popup',
                element: <PopupPage/>
              }
            ]
          }
        ]
      },
      
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
