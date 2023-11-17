import { Table } from 'antd'

export const BookingsTable = (props) => {
  const { tableData, isLoading, onRowClick, searchTerms } = props;

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
          String(record.guest.licenseNum).toLowerCase().includes(value.toLowerCase()) ||
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
  ];

  return (
    <Table 
      dataSource={tableData} 
      columns={columns} 
      loading={isLoading}
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