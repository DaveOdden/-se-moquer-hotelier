import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Form, Button } from 'antd'
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
  const [checkinTime, setCheckinTime] = useState(dayjs('12.00.00', 'HH:mm:ss'));
  const [checkoutTime, setCheckoutTime] = useState(dayjs('10.30.00', 'HH:mm:ss'));
  const [durationOfStay, setDurationOfStay] = useState(0);

  /* Room States */
  const [rooms, setRooms] = useState([]);
  const [roomIsLoading, setRoomLoadingState] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(-1)

  let showDateSelection = selectedGuest
  let showRoomSelection = selectedGuest && checkinDate && checkoutDate && checkinTime && checkoutTime
  let showNewGuestPrompt = selectedGuest === null

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

  const onRoomSelection = (val, obj) => {
    setSelectedRoom(obj.id)
  }

  const moveToNextStep = () => {
    let data = {
      formData: {
        guest: selectedGuest._id,
        room: selectedRoom,
        checkinDate: dayjs(`${checkinDate.format('YYYY-MM-DD')}T${checkinTime.format('HH:mm:ss')}`).toISOString(),
        checkoutDate: dayjs(`${checkoutDate.format('YYYY-MM-DD')}T${checkoutTime.format('HH:mm:ss')}`).toISOString(),
        paid: true,
        billing: {
          rate: 140,
          days: durationOfStay,
          additional: 0,
        }
      },
      guestDetails: {...selectedGuest},
    }

    console.log(data);

    returnFormData(data)
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
      { showNewGuestPrompt && (
        <NewGuestPrompt /> 
      ) }
      { showDateSelection && (
        <NewBookingDateSelection
          onCheckinDateSelection={setCheckinDate}
          onCheckoutDateSelection={setCheckoutDate}
          setCheckinTime={setCheckinTime}
          setCheckoutTime={setCheckoutTime} /> 
      ) }
      { showRoomSelection && (
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