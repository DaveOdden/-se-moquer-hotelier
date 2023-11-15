import { Form, AutoComplete, Button } from 'antd';

export const NewBookingRoomSelection = (props) => {
  const { rooms, onRoomSelection, onRoomSelectionChange, bookingForm, carouselRef } = props
  
  return (
    <>
      <Form.Item 
        name="room" 
        label={`Rooms ${rooms.length ? `(${rooms.length})` : ''}`}
        rules={[
        {
          required: true,
          message: 'a room is required',
        },
      ]}
      >
        <AutoComplete
          options={rooms}
          filterOption={true}
          onSelect={onRoomSelection}
          onChange={onRoomSelectionChange}
        />
      </Form.Item>
      <Form.Item shouldUpdate style={{textAlign: 'right', marginBottom: '0'}}>
        {(bookingForm) => {
          const { guest, checkinDate, checkinTime, checkoutDate, checkoutTime, room } = bookingForm.getFieldsValue();
          const formIsComplete = !!guest && !!checkinDate && !!checkinTime && !!checkoutDate && !!checkoutTime && !!room;
          return (
            <Button 
              type="primary" 
              disabled={!formIsComplete}
              onClick={()=>carouselRef.current.goTo(1)}
            >
              Next
            </Button>
          );
        }}
      </Form.Item>
    </>
  )
}