//import '../wdyr'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { ConfigProvider } from "antd"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                cellPaddingInlineMD: 16,
                headerBg: '#fff'
              }
            }
          }}>
          <App />
        </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
