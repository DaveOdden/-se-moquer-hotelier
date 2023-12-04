//import '../wdyr'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ConfigProvider
					theme={{
						token: {
							fontSizeHeading1: '1.5rem',
							fontSizeHeading2: '1.25rem',
						},
						components: {
							Table: {
								cellPaddingInlineMD: 16,
								headerBg: '#fff',
							},
							Typography: {
								titleMarginBottom: 0,
							},
						},
					}}>
					<App />
				</ConfigProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
)
