import React from 'react';
import { Table, Layout, Space } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SubHeaderComponent from '../components/SubHeaderComponent'
import {roomData} from './roomData'

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
    title: 'Room Num.',
    dataIndex: 'room',
    key: 'room',
    type: 'regular'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    type: 'regular'
  },
  {
    title: 'Guest',
    dataIndex: 'guest',
    key: 'guest',
    type: 'regular'
  },
  {
    title: 'Availability',
    dataIndex: 'availability',
    key: 'availability',
    type: 'regular'
  },
];

export default function Rooms() {
  return (
    <>
      <Header style={headerStyle}>
        <SubHeaderComponent feature="rooms" recordCount={0}>
          <h1>Body</h1>
        </SubHeaderComponent>
      </Header>
      <Content style={contentStyle}>
        <Table dataSource={roomData} columns={columns} size="middle" />
      </Content>
    </>
  )
}