import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Form, Button } from 'antd';
import { NewGuestPrompt } from '../NewGuestPrompt'
import { NewBookingGuestSelection } from './NewBookingGuestSelection'
import { NewBookingDateSelection } from './NewBookingDateSelection'
import { NewBookingRoomSelection } from './NewBookingRoomSelection'
import { BookingsAPI } from 'src/api/BookingsAPI'
import { calculateDuration } from 'src/utils/dateHelpers.js'

export const NewBookingForm = (props) => {
  const { returnFormData, returnSelectedGuestData } = props
  const [bookingForm] = Form.useForm();

  /* Guest States */
  const [selectedGuest, setSelectedGuest] = useState(undefined);

  /* Date / Time States */
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [checkinTime, setCheckinTime] = useState(dayjs('12:00'));
  const [checkoutTime, setCheckoutTime] = useState(dayjs('10:30'));
  const [durationOfStay, setDurationOfStay] = useState(0);

  /* Room States */
  const [rooms, setRooms] = useState([]);
  const [roomIsLoading, setRoomLoadingState] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(-1)

  const populateRoomDropdown = () => {
    if(checkoutDate && checkinDate) {
      setRoomLoadingState(true)
      BookingsAPI.getRoomsByAvailability(checkinDate, checkoutDate).then((res) => {
        setDurationOfStay( calculateDuration(checkinDate, checkoutDate) )
        setRooms(res.message.roomsWithAvailabilityKeyVal)
        setRoomLoadingState(false)
      })
    }
  }

  const onRoomSelectionChange = (val) => {
    if(val === '')
      setSelectedRoom(-1)
  }

  const onRoomSelection = (val) => {
    setSelectedRoom(val)
  }

  const moveToNextStep = () => {
    let data = {
      formData: {
        guest: selectedGuest._id,
        room: selectedRoom,
        checkinDate: checkinDate,
        checkoutDate: checkoutDate,
        paid: true,
        billing: {
          rate: 140,
          days: durationOfStay,
          additional: 0,
        }
      },
      guestDetails: {...selectedGuest},
    }

    returnFormData(data)
  }

  const showDateSelection = () => {
    return selectedGuest
  }

  const showRoomSelection = () => {
    return selectedGuest && checkinDate && checkoutDate && checkinTime && checkoutTime
  }

  useEffect(() => populateRoomDropdown(), [checkinDate, checkoutDate])

  return (
    <Form 
      id="bookingForm" 
      initialValues={{
        checkinTime: dayjs('12:00', 'HH:mm'),
        checkoutTime: dayjs('10:30', 'HH:mm'),
      }}
      form={bookingForm}
      validateTrigger="onChange">
      <NewBookingGuestSelection setSelectedGuest={setSelectedGuest} />
      { selectedGuest === null && <NewGuestPrompt /> }
      { showDateSelection() && (
        <NewBookingDateSelection
          onCheckinDateSelection={setCheckinDate}
          onCheckoutDateSelection={setCheckoutDate}
          setCheckinTime={setCheckinTime}
          setCheckoutTime={setCheckoutTime} /> 
      ) }
      { showRoomSelection() && (
        <>
          <NewBookingRoomSelection
            rooms={rooms}
            roomIsLoading={roomIsLoading}
            onRoomSelection={onRoomSelection}
            onRoomSelectionChange={onRoomSelectionChange} /> 
          <Form.Item shouldUpdate style={{textAlign: 'right', marginBottom: '0'}}>
            {(bookingForm) => {
              const { guest, checkinDate, checkinTime, checkoutDate, checkoutTime, room } = bookingForm.getFieldsValue();
              const formIsComplete = !!guest && !!checkinDate && !!checkinTime && !!checkoutDate && !!checkoutTime && !!room;
              return (
                <Button 
                  type="primary" 
                  disabled={!formIsComplete}
                  onClick={moveToNextStep}>
                  Next
                </Button>
              );
            }}
          </Form.Item>
        </>
      ) }
    </Form>
  )
}