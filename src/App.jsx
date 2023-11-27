import './App.css'
import React from 'react'
import { Layout, Row, Col } from 'antd';
const { Header } = Layout;
import HeaderComponent from './components/HeaderComponent'
import {Overview} from './features/Overview/Index'
import Bookings from './features/Bookings/Bookings'
import Guests from './features/Guests/Guests'
import Rooms from './features/Rooms/Rooms'
import { Settings } from './features/Settings/Settings'
import { Routes, Route, Outlet } from "react-router-dom"

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  height: 64,
  paddingInline: 16,
  lineHeight: '64px',
  backgroundColor: '#fff',
  borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
};

const App = () => {
  return (
    <Row
      align="middle"
      justify="center"
      style={{
        padding: '32px 0'
      }}>
      <Col 
        span="24"
        style={{
          maxWidth: 1440,
          height: '100%',
          maxHeight: 'calc(100vh - 64px)',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid #111',
        }}>
        <Layout>
          <Header style={headerStyle}>
            <HeaderComponent/>
          </Header>
          <Routes>
            <Route path="/" element={<MockLayout />}>
              <Route index element={<h1>Home</h1>} />
              <Route path="overview" element={<Overview />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="guests" element={<Guests />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<h1>No</h1>} />
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