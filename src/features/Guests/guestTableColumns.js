export const columnDefinitions = [
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    width: '200px',
    key: 'lastName',
    paddingLeft: '50px'
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '200px',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '70px'
  },
  {
    title: 'Street Name',
    dataIndex: ['address', 'street'],
    key: 'street',
    width: '200px',
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