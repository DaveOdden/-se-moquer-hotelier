import React, { useState, useEffect } from 'react';
import { GuestAPI } from '../../api/GuestAPI'
import { RoomsAPI } from '../../api/RoomAPI'
import { BookingsByRoomAPI } from '../../api/BookingsAPI'
import { AutoComplete, Space, Form, Input, Button, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';

export default function NewBookingForm(props) {
  const [guests, setGuests] = useState([]);
  const [guestsKeyValueSet, setGuestsForAutoComplete] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [arrayOfDatesRoomIsBooked, setArrayOfDatesRoomIsBooked] = useState([]);
  const [bookingsForSelectedRoom, setBookingsForSelectedRoom] = useState([]);
  const [roomsKeyValueSet, setRoomsForAutoComplete] = useState([]);
  const [guestIsLoading, setGuestLoadingState] = useState(true);
  const [roomIsLoading, setRoomLoadingState] = useState(true);;
  const format = 'h:mm a';
  const dates = ['2023-10-23', '2023-10-19']

  const getGuestData = () => {
    GuestAPI.get('keyvaluepair').then((res) => {
      setGuests(res.message)
      setGuestsForAutoComplete(res.keyvalpair)
      setGuestLoadingState(false)
    })
  }

  const getRoomData = () => {
    RoomsAPI.get('keyvaluepair').then((res) => {
      setRooms(res.rooms)
      setRoomsForAutoComplete(res.keyvalpair)
      setRoomLoadingState(false)
    })
  }

  const getBookingData = (roomId) => {
    BookingsByRoomAPI.get('id', roomId).then((res) => {
      console.log(res.message)
      setBookingsForSelectedRoom(res.message.bookings);
      setArrayOfDatesRoomIsBooked(res.message.datesBooked)
    })
  }

  const getRoomAvailability = (id) => {
    getBookingData(id);
  }

  const init = () => {
    getGuestData()
    getRoomData()
  }

  useEffect(() => init, [])

  const findDatesToDisable = (current) => {
    let index = arrayOfDatesRoomIsBooked.findIndex(date => date === dayjs(current).format('YYYY-MM-DD'))
    return index > -1 && true
  }

  return (

      <Form id="bookingForm" onFinish={props.submitFn}>
      <Form.Item name="name" label="Guest">
        <AutoComplete
          options={guestsKeyValueSet}
          filterOption={true}
          placeholder="Search Guests"
        />
      </Form.Item>
      <Form.Item name="room" label="Room">
        <AutoComplete
          options={roomsKeyValueSet}
          filterOption={true}
          placeholder="Search Rooms"
          onChange={getRoomAvailability}
        />
      </Form.Item>
      <Space>
        <Form.Item name="checkinDate" label="CheckIn Date">
          <DatePicker 
            disabledDate={findDatesToDisable}
          />
        </Form.Item>
        <Form.Item name="checkinTime" label="Checkin Time">
          <TimePicker 
            use12Hours 
            minuteStep={15} 
            defaultValue={dayjs('12:00', 'HH:mm')} 
            format="h:mm a"
          />
        </Form.Item>
      </Space>
      <Space>
        <Form.Item name="checkoutDate" label="Checkout Date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="checkoutTime" label="Checkout Time">
          <TimePicker 
            use12Hours 
            minuteStep={15} 
            defaultValue={dayjs('10:30', 'HH:mm')} 
            format="h:mm a" 
          />
        </Form.Item>
      </Space>
      <Form.Item label="Payment">
        <Input placeholder="Payment"/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" key="submit" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

  )
}