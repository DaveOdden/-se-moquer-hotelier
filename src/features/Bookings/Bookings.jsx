import React, { useState, useEffect } from 'react';
import { Table, Layout, Space, Form, Input, Button, message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SubHeaderComponent from '../../components/SubHeaderComponent'
import NewBookingContainer from '../NewBooking/Index'
import { BookingsAPI } from '../../api/BookingsAPI'
import BookingDetail from './BookingDetail';

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  height: 64,
  paddingInline: 16,
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

export default function Bookings(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoadingState] = useState(true);
  const [newBookingFormStatus, setNewBookingFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [showBookingDetail, setShowBookingDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  async function createBooking(data) {
    setNewBookingFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })
    BookingsAPI.post(data).then((res) => {
      setTimeout(() => {
        message.success("Booking Completed!")
      },1000)
      setTimeout(() => {
        setNewBookingFormStatus({
          loading: false, 
          response: true, 
          error: null, 
          pristine: false
        })
      },1200)
    })
  }

  const guestBookingData = () => {
    BookingsAPI.get().then((res) => {
      setBookings(res.message);
      setLoadingState(false);
    })
  }

  const showDetail = (record) => {
    setShowBookingDetail(true)
    setSelectedRecord(record)
  }

  const hideDetail = () => {
    setShowBookingDetail(false)
    setSelectedRecord(null)
  }

  useEffect(() => guestBookingData, []);
  useEffect(() => guestBookingData, [newBookingFormStatus]);

  return (
    <>
      {contextHolder}
      <Header style={headerStyle}>
        <SubHeaderComponent 
          feature="Bookings" 
          recordCount={0} 
          newRecordBtn={true}
          formStatus={newBookingFormStatus}
        >
          <NewBookingContainer submitFn={createBooking} />
        </SubHeaderComponent>
      </Header>
      <Content style={contentStyle}>
        <Table 
          dataSource={bookings} 
          columns={columns} 
          loading={isLoading}
          size="middle"
          pagination={false}
          rowKey={(record) => record._id}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                showDetail(record, rowIndex)
              }
            };
          }}
          scroll={{
            y: 'calc(100vh - 241px)' // table header height, sub header height, header height, container margin
          }}
        />
        <BookingDetail 
          show={showBookingDetail} 
          data={selectedRecord} 
          onClose={hideDetail}
        />
      </Content>
    </>
  )
}