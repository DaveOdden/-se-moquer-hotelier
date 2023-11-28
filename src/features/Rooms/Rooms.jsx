import { useState, useEffect } from 'react'
import { Layout, Flex, Modal, Spin } from 'antd'
const { Header, Content } = Layout
import SubHeaderComponent from '../../components/SubHeaderComponent'
import { RoomGrid } from './RoomGrid'
import { RoomDetail } from './RoomDetail'
import { useRooms } from 'src/hooks/useRoomsQuery'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'

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
  const rooms = useRooms()
  const [selectedRoom, setSelectedRoom] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRoomGrid, setShowRoomGrid] = useState(false);

  const showModal = (selectedRoom) => {
    setIsModalOpen(true);
    setSelectedRoom(selectedRoom);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRoom({});
  };

  useEffect(() => setShowRoomGrid(true),[])

  return (
    <ErrorBoundary>
      <Header style={headerStyle}>
        <SubHeaderComponent 
          featureName="rooms" 
          recordCount={0} 
          newRecordBtn={false} />
      </Header>
      <Content style={contentStyle}>
        <Flex 
          wrap="wrap" 
          justify="flex-start" 
          style={{ 
            background: '#f5f5f5', 
            height: '100%', 
            padding: '8px 0'
          }}>
          { rooms.data && showRoomGrid && <RoomGrid rooms={rooms.data} showModal={showModal} /> || <Spin style={{  width: '100%', textAlign: 'center',  margin: '32px'}}/> }
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
    </ErrorBoundary>
  )
}