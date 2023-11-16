import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { BookingsAPI } from '../../api/BookingsAPI'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import BookingDetail from './BookingDetail'
import { useGuestData } from '../../hooks/useGuests'
import { useBookings } from '../../hooks/useBookings'
import NewBookingContainer from '../NewBooking/Index'

export default function Bookings(props) {
  const guests = useGuestData();
  const bookings = useBookings();
  const [newBookingFormStatus, setNewBookingFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [showBookingDetail, setShowBookingDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [toastNotification, setToastNotification] = useState({ message: null, type: null});

  const columns = [
    {
      title: 'Room id.',
      dataIndex: ['room', '_id'],
      key: 'room',
      filteredValue: [searchValue],
      onFilter: (value, record) => {
        return (
          String(record.room._id).toLowerCase().includes(value.toLowerCase()) || 
          String(record.guest._id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.checkinDate).toLowerCase().includes(value.toLowerCase()) ||
          String(record.checkoutDate).toLowerCase().includes(value.toLowerCase())
        )
      }
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

  async function createBooking(data) {
    setNewBookingFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })
    BookingsAPI.post(data).then((res) => {
      if(res.success) {
        setTimeout(() => {
          //message.success("Booking Successful")
          setToastNotification({
            message: "Booking Successful",
            type: 'success'
          })
        },700)
        setTimeout(() => {
          setNewBookingFormStatus({
            loading: false, 
            response: true, 
            error: null, 
            pristine: false
          })
        },900)
      } else {
        //messageApi.error('Error. Something screwed up...');
        setToastNotification({
          message: "Error. Something screwed up...",
          type: 'error'
        })
        setNewBookingFormStatus({
          loading: null, 
          response: null, 
          error: true, 
          pristine: false
        })
      }
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

  const deleteBooking = (id) => {
    BookingsAPI.delete(id).then((res) => {
      if(res.success) {
        messageApi.success('Success. Booking deleted');
        setTimeout( () => {
          setNewBookingFormStatus({
            loading: false, 
            response: true, 
            error: null, 
            pristine: false
          })
        }, 1200)
        setTimeout( hideDetail, 800)
      } else {
        messageApi.error('Error. Something screwed up...');
        setNewBookingFormStatus({
          loading: null, 
          response: null, 
          error: true, 
          pristine: false
        })
      }
    })
  }

  const searchTable = (e) => {
    const currentSearch = e.target.value;
    setSearchValue(currentSearch);
  }

  useEffect(() => bookings.getBookings(), [newBookingFormStatus]);

  return (
    <FeatureWrapper
      subHeaderProps={{
        feature: "Bookings", 
        recordCount: 0,
        newRecordBtn: true,
        formStatus: newBookingFormStatus,
        search: searchTable
      }}
      newRecordComponent={<NewBookingContainer submitFn={createBooking} />}
      toastNotification={toastNotification}>
      <Table 
        dataSource={bookings.records} 
        columns={columns} 
        loading={bookings.isLoading}
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
        }} />
      <BookingDetail 
        show={showBookingDetail} 
        data={selectedRecord}
        deleteBooking={deleteBooking} 
        onClose={hideDetail} />
    </FeatureWrapper>
  )
}