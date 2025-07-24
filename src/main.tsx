import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { ConfigProvider } from 'antd'
import trTR from 'antd/locale/tr_TR'
import { router } from '@router/router'
import { queryClient } from '@utils/queryClient'

import '@styles/globals.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={trTR}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)