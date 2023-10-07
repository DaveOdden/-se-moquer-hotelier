import './App.css'
import React from 'react';
import { Table, Layout, Space } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import HeaderComponent from './components/HeaderComponent'
import Bookings from './features/Bookings'
import Guests from './features/Guests'
import { Routes, Route, Outlet, Link } from "react-router-dom";

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff',
  borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
};

const contentStyle = {
  textAlign: 'center',
  height: 'calc(100vh - 128px)',
  color: '#333',
  backgroundColor: '#fff',
};

const App = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
      size={[0, 48]}
    >
      <Layout>
        <Header style={headerStyle}>
          <HeaderComponent/>
        </Header>
        <Routes>
          <Route path="/" element={<MockLayout />}>
            <Route index element={<h1>Home</h1>} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="guests" element={<Guests />} />
            <Route path="*" element={<h1>No</h1>} />
          </Route>
        </Routes>
      </Layout>
    </Space>
  )
}

function MockLayout() {
  return (
    <Outlet />
  );
}

export default App