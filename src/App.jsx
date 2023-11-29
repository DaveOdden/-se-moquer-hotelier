import { Routes, Route, Outlet } from "react-router-dom"
import './App.css'
import { Layout, Row, Col } from 'antd'
const { Header } = Layout
import HeaderComponent from './components/HeaderComponent'
import {Overview} from './features/Overview/Index'
import Bookings from './features/Bookings/Bookings'
import Guests from './features/Guests/Guests'
import Rooms from './features/Rooms/Rooms'
import { Settings } from './features/Settings/Settings'

const App = () => {
  return (
    <Row
      align="middle"
      justify="center"
      className="py-8">
      <Col 
        span="24"
        className="max-w-app max-h-app rounded-2xl overflow-hidden border border-slate-950">
        <Layout>
          <Header className="bg-white h-16 text-slate-800 border-b border-slate-100 px-4">
            <HeaderComponent/>
          </Header>
          <Routes>
            <Route path="/" element={<MockLayout />}>
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="guests" element={<Guests />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<h1>None</h1>} />
            </Route>
          </Routes>
        </Layout>
      </Col>
    </Row>
  )
}

function MockLayout() {
  return (
    <Outlet />
  );
}

export default App