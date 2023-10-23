import React, { useState, useEffect } from 'react';
import { Layout, Flex, Typography, Modal, Space, Button, message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;
import SubHeaderComponent from '../components/SubHeaderComponent'
import { RoomsAPI } from '../api/RoomAPI'
import { MoneyCollectOutlined } from '@ant-design/icons';

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
  const [rooms, setRooms] = useState([]);
  const [contentIsLoading, setLoadingState] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roomsPerFloor = 26;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const getGuestData = () => {
    RoomsAPI.get().then((res) => {
      setRooms(res.message);
      setLoadingState(false);
    })
  }
  
  useEffect(() => getGuestData, []);

  return (
    <>
      {contextHolder}
      <Header style={headerStyle}>
        <SubHeaderComponent feature="rooms" recordCount={0} newRecordBtn={false}>
          <h1>Body</h1>
        </SubHeaderComponent>
      </Header>
      <Content style={contentStyle}>
        <Flex wrap="wrap">
          {!contentIsLoading && rooms.map((room) => {
            return (
              <Space.Compact direction="vertical" style={{width: 'calc(100%/26)', marginTop: '1.5rem'}}>
                <Button onClick={showModal} style={{height: '4.5rem', borderRadius: 0}} disabled={room.status.occupied ? true : false} block>
                  {/* <MoneyCollectOutlined style={{color: room.status.occupied ? '#eee':'#333333', fontSize: '2.5rem'}}/> */}
                  <Text>{room.roomNum}</Text>
                </Button>
              </Space.Compact>
            )
          })}
        </Flex>
      </Content>
      <Modal 
        title={`Room Information`} 
        open={isModalOpen} 
        footer={null}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <h1>Modal Content</h1>
      </Modal>
    </>
  )
}