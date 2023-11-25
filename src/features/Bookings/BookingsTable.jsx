import { useMemo } from 'react'
import { Table } from 'antd'
import { getAdditionalDataForEachBooking } from './utils/aggregateBookings'

export const BookingsTable = (props) => {
  const { guests, bookings, rooms, onRowClick, searchTerms } = props;
  const tableData = useMemo( () => getAdditionalDataForEachBooking(guests, bookings, rooms), [bookings])

  const columns = [
    {
      title: 'Room Num',
      dataIndex: ['room', 'roomNum'],
      key: 'room',
      filteredValue: [searchTerms],
      onFilter: (value, record) => {
        return (
          String(record.room._id).toLowerCase().includes(value.toLowerCase()) || 
          String(record.guest._id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guest.fullName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guest.licenseNumber).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guest.dob).toLowerCase().includes(value.toLowerCase()) ||
          String(record.checkinDate).toLowerCase().includes(value.toLowerCase()) ||
          String(record.checkoutDate).toLowerCase().includes(value.toLowerCase()) ||
          String(record.checkinDateReadable).toLowerCase().includes(value.toLowerCase()) ||
          String(record.checkoutDateReadable).toLowerCase().includes(value.toLowerCase())
        )
      },
      width: '120px'
    },
    {
      title: 'Guest Name',
      dataIndex: ['guest', 'fullName'],
      key: 'name',
    },
    {
      title: 'Checkin',
      dataIndex: 'checkinDateReadable',
      key: 'checkin',
    },
    {
      title: 'Checkout',
      dataIndex: 'checkoutDateReadable',
      key: 'checkout',
    },
    {
      title: 'Confirmation #',
      dataIndex: '_id',
      key: 'checkout',
    },
  ];

  return (
    <Table 
      dataSource={tableData} 
      columns={columns} 
      loading={[guests, bookings, rooms].some(query => query.isPending)}
      size="middle"
      pagination={false}
      rowKey={(record) => record._id}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            onRowClick(record, rowIndex)
          }
        };
      }}
      scroll={{
        y: 'calc(100vh - 241px)' // table header height, sub header height, header height, container margin
      }} />
  )
}