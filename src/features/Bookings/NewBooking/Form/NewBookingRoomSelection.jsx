import { Form, AutoComplete } from 'antd';

export const NewBookingRoomSelection = (props) => {
  const { 
    rooms, 
    roomIsLoading,
    onRoomSelection, 
    onRoomSelectionChange, 
  } = props
  
  return (
    <>
      <Form.Item 
        name="room" 
        label={`Rooms ${rooms.length ? `(${rooms.length})` : ''}`}
        rules={[{
          required: true,
          message: 'a room is required',
        }]}>
        <AutoComplete
          options={rooms}
          filterOption={true}
          onSelect={onRoomSelection}
          onChange={onRoomSelectionChange}
          placeholder={roomIsLoading ? 'Loading...' : ''} 
          disabled={roomIsLoading} />
      </Form.Item>
    </>
  )
}