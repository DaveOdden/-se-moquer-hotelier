import React, { useState, useEffect } from 'react';
import { GuestAPI } from '../../api/GuestAPI'
import { RoomsAPI } from '../../api/RoomAPI'
import { AutoComplete, Space, Form, Input, Button, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';

export default function NewBookingForm(props) {
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [guestIsLoading, setGuestLoadingState] = useState(true);
  const [roomIsLoading, setRoomLoadingState] = useState(true);
  const format = 'h:mm a';

  const getGuestData = () => {
    GuestAPI.get().then((res) => {
      setGuests(res.message)
      setGuestLoadingState(false)
    })
  }

  const getRoomData = () => {
    RoomsAPI.get().then((res) => {
      console.log(res.message);
      setRooms(res.message)
      setRoomLoadingState(false)
    })
  }

  const init = () => {
    getGuestData()
    getRoomData()
  }

  useEffect(() => init, [])

  return (
    <Form id="bookingForm" onFinish={props.submitFn}>
      <Form.Item name="name" label="Guest's Name">
        <AutoComplete
          options={[{label: 'label', value: 'value'}]}
          placeholder="Search Guests"
        />
      </Form.Item>
      <Form.Item name="room" label="Room">
        <AutoComplete
          options={[{label: 'label', value: 'value'}]}
          placeholder="Search Guests"
        />
      </Form.Item>
      <Space>
        <Form.Item name="checkinDate" label="CheckIn Date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="checkinTime" label="Checkin Time">
          <TimePicker use12Hours minuteStep={15} defaultValue={dayjs('10:30', 'HH:mm')} format="h:mm a" />
        </Form.Item>
      </Space>
      <Space>
        <Form.Item name="checkoutDate" label="Checkout Date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="checkoutTime" label="Checkout Time">
          <TimePicker use12Hours minuteStep={15} defaultValue={dayjs('10:30', 'HH:mm')} format="h:mm a" />
        </Form.Item>
      </Space>
      <Form.Item label="Payment">
        <Input placeholder="Payment"/>
      </Form.Item>

      <Form.Item>
        <Button  type="primary" key="submit" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}