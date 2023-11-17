import { Table } from 'antd'

export const BookingsTable = (props) => {
  const { tableData, isLoading, onRowClick, searchTerms } = props;

  const columns = [
    {
      title: 'Room id.',
      dataIndex: ['room', '_id'],
      key: 'room',
      filteredValue: [searchTerms],
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