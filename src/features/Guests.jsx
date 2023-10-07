import React from 'react';
import { Table, Layout, Space } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SubHeaderComponent from '../components/SubHeaderComponent'

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

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export default function Guests() {
  return (
    <>
      <Header style={headerStyle}>
        <SubHeaderComponent/>
      </Header>
      <Content style={contentStyle}>
        <Table dataSource={dataSource} columns={columns} size="middle" />
      </Content>
    </>
  )
}