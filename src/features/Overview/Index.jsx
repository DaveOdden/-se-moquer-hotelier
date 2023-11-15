import React from 'react'
import { Layout } from 'antd'
import { BookedRoomsWidget } from './BookedRoomsWidget'
const { Content } = Layout

const contentStyle = {
  textAlign: 'center',
  height: 'calc(100vh - 128px)',
  color: '#333',
  backgroundColor: '#fff',
};

export const Overview = () => {
  return (
    <Content style={contentStyle}>
      <BookedRoomsWidget />
    </Content>
  )
}