import React, { useState, useEffect } from 'react';
import { GuestAPI } from '../../api/GuestAPI'
import { RoomsAPI } from '../../api/RoomAPI'
import { BookingsByRoomAPI } from '../../api/BookingsAPI'
import { AutoComplete, Space, Flex, Form, Input, Button, DatePicker, TimePicker, Typography } from 'antd';
const { Text } = Typography;
import dayjs from 'dayjs';

export default function NewBookingForm(props) {
  const [guests, setGuests] = useState([]);
  const [guestsKeyValueSet, setGuestsForAutoComplete] = useState([]);
  const [guestSearchHasNoMatch, setGuestSearchHasNoMatch] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [arrayOfDatesRoomIsBooked, setArrayOfDatesRoomIsBooked] = useState([]);
  const [bookingsForSelectedRoom, setBookingsForSelectedRoom] = useState([]);
  const [roomsKeyValueSet, setRoomsForAutoComplete] = useState([]);
  const [guestIsLoading, setGuestLoadingState] = useState(true);
  const [roomIsLoading, setRoomLoadingState] = useState(true);;
  const format = 'h:mm a';

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

  // const handleGuestSearch = (one, two, three) => {
  //   console.log(one);
  //   console.log(two);
  //   console.log(three);
  //   console.log(guestsKeyValueSet);
  // }

  // const filterOption = (inputValue, option) => {
  //   //console.log(inputValue, option);
  //   let valueIsPresentInOptions = option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  //   console.log('valueIsPresentInOptions: ' + valueIsPresentInOptions)
  //   console.log(option)
  //   console.log('')
  //   setFilteredGuests(option)
  //   return valueIsPresentInOptions
  // }

  const findDatesToDisable = (current) => {
    let index = arrayOfDatesRoomIsBooked.findIndex(date => date === dayjs(current).format('YYYY-MM-DD'))
    return index > -1 && true
  }

  const handleSearch = (query) => {
    let hasMatch = false;
    for (const el of guestsKeyValueSet) {
      let hasValueMatch, hasLabelMatch = false;
      hasLabelMatch = el.label.indexOf(query) !== -1 ? true : false
      hasValueMatch = el.value.indexOf(query) !== -1 ? true : false
      if(hasLabelMatch || hasValueMatch) {
        hasMatch = true
        break;
      }
    }
    if(!hasMatch) {
      console.log('no match')
      setGuestSearchHasNoMatch(true)
    } else if(hasMatch && guestSearchHasNoMatch) {
      setGuestSearchHasNoMatch(false)
    }
  };

  return (

    <Form id="bookingForm" onFinish={props.submitFn}>
      <Form.Item name="name" label="Guest" style={{marginTop: '32px'}}>
        <AutoComplete
          options={guestsKeyValueSet}
          filterOption={true}
          onSearch={handleSearch}
          placeholder="Search Guests"
        />
      </Form.Item>
      { guestSearchHasNoMatch && 
        <Flex align="center" justify="space-between">
          <Text style={{display: 'inline-block', fontSize: '.75rem'}}>
            <span style={{fontWeight: 'bold'}}>This guest is not in our system.</span><br /> Register this individual to start the booking process.
          </Text>
          <Button type="primary">
            Create New Guest
          </Button>
        </Flex>
      }
      {/* <Form.Item name="room" label="Room">
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
      </Form.Item> */}
{/* 
      <Form.Item>
        <Button type="primary" key="submit" htmlType="submit" disabled>
          Submit
        </Button>
      </Form.Item> */}
    </Form>

  )
}