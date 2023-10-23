import React, { useState, useEffect } from 'react';
import { Table, Layout, message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SubHeaderComponent from '../components/SubHeaderComponent'
import { BookingsAPI } from '../api/BookingsAPI'

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

const columns = [
  {
    title: 'Room id.',
    dataIndex: ['room', '_id'],
    key: 'room',
  },
  {
    title: 'Guest Name',
    dataIndex: ['guest', '_id'],
    key: 'name',
  },
  {
    title: 'Checkin',
    dataIndex: 'checkinDate',
    key: 'checkin',
  },
  {
    title: 'Checkout',
    dataIndex: 'checkoutDate',
    key: 'checkout',
  },
];

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  const guestBookingData = () => {
    BookingsAPI.get().then((res) => {
      setBookings(res.message);
      setLoadingState(false);
    })
  }

  useEffect(() => guestBookingData, []);

  return (
    <>
      <Header style={headerStyle}>
        <SubHeaderComponent feature="bookings" recordCount={0}>
          <h1>Body</h1>
        </SubHeaderComponent>
      </Header>
      <Content style={contentStyle}>
        <Table dataSource={bookings} columns={columns} size="middle" />;
      </Content>
    </>
  )
}