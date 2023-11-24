import React, { useState, useEffect } from 'react'
import { Layout, Flex, Typography, Modal, Space, Button, message } from 'antd'
const { Header, Content } = Layout
const { Text } = Typography
import SubHeaderComponent from '../../components/SubHeaderComponent'
import RoomDetail from './RoomDetail'
import { RoomsAPI } from '../../api/RoomAPI'
import { BookingsAPI } from '../../api/BookingsAPI'
import { useSettings } from 'src/hooks/useSettings'

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  height: 64,
  paddingInline: 16,
  lineHeight: '64px',
  backgroundColor: '#fff',
  borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
};

const contentStyle = {
  textAlign: 'center',
  height: 'calc(100vh - 194px)',
  color: '#333',
  backgroundColor: '#fff',
};

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [bookings, setRoomBookings] = useState([]);
  const [contentIsLoading, setLoadingState] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { settings } = useSettings();

  const showModal = (selectedRoom) => {
    setIsModalOpen(true);
    setSelectedRoom(selectedRoom);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRoom({});
  };

  const getBookedRooms = () => {
    BookingsAPI.get().then((res) => {
      setRoomBookings(res.arrayOfRoomsBooked);
    })
  }
  
  const getRoomData = () => {
    RoomsAPI.get().then((res) => {
      setRooms(res.message);
      setLoadingState(false);
      getBookedRooms();
    })
  }
  
  useEffect(() => getRoomData, []);

  return (
    <>
      {contextHolder}
      <Header style={headerStyle}>
        <SubHeaderComponent feature="rooms" recordCount={0} newRecordBtn={false} />
      </Header>
      <Content style={contentStyle}>
        <Flex wrap="wrap" justify="flex-start" style={{ background: '#f5f5f5', height: '100%', padding: '8px 0' }}>
          {!contentIsLoading && settings?.properties?.roomsPerFloor && rooms.map((room) => {
            return (
            <Space.Compact 
              size="small"
              align="start"
                direction="horizontal" 
                style={{
                  width: `calc(100%/${settings?.properties?.roomsPerFloor})`, 
                  padding: '8px 0'
                }} 
                key={room._id}>
                <Button 
                  onClick={() => showModal(room)} 
                  style={{ height: '100%', borderRadius: 0, background: (bookings && bookings.includes(room._id) ? '#f0f0f0' : 'white')}} 
                  block>
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
        destroyOnClose={true}>
        <RoomDetail room={selectedRoom} />
      </Modal>
    </>
  )
}