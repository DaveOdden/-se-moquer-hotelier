import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import { Layout } from 'antd'
import { BookedRoomsWidget } from './BookedRoomsWidget'
const { Content } = Layout

export const Overview = () => {
	return (
		<ErrorBoundary>
			<Content className="bg-white text-slate-800 h-content border-t border-slate-100 text-center pt-8">
				<BookedRoomsWidget />
			</Content>
		</ErrorBoundary>
	)
}
