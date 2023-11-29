import { Layout } from 'antd'
import { BookedRoomsWidget } from './BookedRoomsWidget'
const { Content } = Layout

export const Overview = () => {
  return (
    <Content className="bg-white text-slate-800 h-content border-t border-slate-100">
      <BookedRoomsWidget />
    </Content>
  )
}