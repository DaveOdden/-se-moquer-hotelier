import { useState, useEffect } from 'react'
import { Layout, Flex, Modal, Spin } from 'antd'
const { Header, Content } = Layout
import SubHeaderComponent from '../../components/SubHeaderComponent'
import { RoomGrid } from './RoomGrid'
import { RoomDetail } from './RoomDetail'
import { useRooms } from 'src/hooks/useRoomsQuery'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'

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
      <Header className="bg-white h-16 text-slate-800 px-4">
        <SubHeaderComponent 
          featureName="rooms" 
          recordCount={0} 
          newRecordBtn={false} />
      </Header>
      <Content className="bg-white text-slate-800 h-content border-t border-slate-100">
        <Flex 
          wrap="wrap" 
          justify="flex-start"
          className="h-full py-8 bg-slate-100">
          { rooms.data && showRoomGrid && <RoomGrid rooms={rooms.data} showModal={showModal} /> || <Spin className="w-full text-center m-8" /> }
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