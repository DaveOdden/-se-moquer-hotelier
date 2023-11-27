import { Table } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'

export const GuestTable = (props) => {
  const { tableData, isLoading, onRowClick, searchTerms } = props;

  const columnDefinitions = [
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      width: '200px',
      key: 'lastName',
      paddingLeft: '50px',
      filteredValue: [searchTerms],
      onFilter: (value, record) => {
        return (
          String(record.firstName).toLowerCase().includes(value.toLowerCase()) || 
          String(record.lastName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.address.street).toLowerCase().includes(value.toLowerCase()) ||
          String(record.address.city).toLowerCase().includes(value.toLowerCase()) ||
          String(record.address.state).toLowerCase().includes(value.toLowerCase()) ||
          String(record.address.zip).toLowerCase().includes(value.toLowerCase()) ||
          String(record.licenseNumber).toLowerCase().includes(value.toLowerCase()) ||
          String(record.status).toLowerCase().includes(value.toLowerCase())
        )
      }
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '200px',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      width: '170px'
    },
    {
      title: 'Street Name',
      dataIndex: ['address', 'street'],
      key: 'street',
      width: '230px',
    },
    {
      title: 'City',
      dataIndex: ['address', 'city'],
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: ['address', 'state'],
      key: 'state',
      width: '70px'
    },
    {
      title: 'ZipCode',
      dataIndex: ['address', 'zip'],
      key: 'zip',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <ErrorBoundary>
      <Table 
        dataSource={tableData} 
        columns={columnDefinitions} 
        size="middle" 
        rowKey={(record) => record._id}
        loading={isLoading}
        pagination={false}
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
    </ErrorBoundary>
  )
}