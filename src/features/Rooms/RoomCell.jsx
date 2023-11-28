import { Typography, Space, Button } from 'antd'
const { Text } = Typography

export const RoomCell = props => {
  const { room, width, showModal, bookedRooms } = props 
  return (
    <Space.Compact 
      size="small"
      align="start"
      direction="horizontal" 
      style={{
        width: width,
        padding: '8px 0'
      }}>
      <Button 
        block
        onClick={() => showModal(room)} 
        style={{ 
          height: '100%', 
          borderRadius: 0, 
          background: (bookedRooms && bookedRooms.includes(room._id) ? '#f0f0f0' : 'white')
        }}>
        <Text>{room.roomNum}</Text>
      </Button>
    </Space.Compact>
  )
}
