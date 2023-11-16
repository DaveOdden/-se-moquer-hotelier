
import React, { useState, useRef } from 'react';
import { BookingsAPI } from '../../api/BookingsAPI'
import NewGuestPrompt from './NewGuestPrompt'
import { NewBookingGuestSelection } from './NewBookingGuestSelection'
import { NewBookingDateSelection } from './NewBookingDateSelection'
import { NewBookingRoomSelection } from './NewBookingRoomSelection'
import BookingConfirmation from './NewBookingConfirmation'
import { Form, Carousel } from 'antd';
import dayjs from 'dayjs';

const carouselHeightInactive = {
  height: 0,
  overflow: 'hidden'
}

export const NewBookingFlow = (props) => {
  const roomRate = 140;
  const carouselRef = useRef()
  const [bookingForm] = Form.useForm();
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [confirmationIsLoading, setConfirmationLoading] = useState(false)
  const [bookingIsSuccess, setBookingIsSuccess] = useState(false)

  /* Guest States */
  const [guestIsLoading, setGuestLoadingState] = useState(true);
  const [guestSearchHasNoMatch, setGuestSearchHasNoMatch] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(false);

  /* Date / Time States */
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [checkinTime, setCheckinTime] = useState(dayjs('12:00'));
  const [checkoutTime, setCheckoutTime] = useState(dayjs('10:30'));
  const [durationOfStay, setDurationOfStay] = useState(0);

  /* Room States */
  const [rooms, setRooms] = useState([]);
  const [roomIsLoading, setRoomLoadingState] = useState(true);
  const [showRoomSelection, setShowRoomSelection] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(-1)

  const calculateDuration = (checkinDate, checkoutDate) => {
    setDurationOfStay(checkoutDate.diff(checkinDate, "days"))
  }

  const onCheckinDateSelection = (val) => {
    if( val ) {
      setCheckinDate(val)
      if(checkoutDate && checkinDate) {
        BookingsAPI.getRoomsByAvailability(checkinDate, checkoutDate).then((res) => {
          console.log(res);
        })
      }
    }
  }

  const onCheckoutDateSelection = (val) => {
    if( val ) {
      setCheckoutDate(val)
      if(checkinDate) {
        let $checkinDate = dayjs(checkinDate);
        let $checkoutDate = dayjs(val);
        setRoomLoadingState(true)
        BookingsAPI.getRoomsByAvailability($checkinDate.format('YYYY-MM-DD'), $checkoutDate.format('YYYY-MM-DD')).then((res) => {
          setShowRoomSelection(true)
          calculateDuration($checkinDate,$checkoutDate)
          setRooms(res.message.roomsWithAvailabilityKeyVal)
          setRoomLoadingState(false)
        })
      }
    }
  }

  const onRoomSelectionChange = (val) => {
    if(val === '')
      setSelectedRoom(-1)
  }

  const onRoomSelection = (val) => {
    setSelectedRoom(val)
  }

  const submitBooking = () => {
    let data = {
      guest:selectedGuest._id,
      room: selectedRoom,
      checkinDate: checkinDate,
      checkoutDate: checkoutDate,
      paid: true,
      billing: {
        rate: roomRate,
        days: durationOfStay,
        additional: 0,
      }
    }

    setConfirmationLoading(true)
    props.submitFn(data).then(() => {
      setTimeout(() => {
        setConfirmationLoading(false)
        setBookingIsSuccess(true)
      },1200)
    })
  }

  const onBeforeChangeCarousel = (current, next) => {
    setCarouselIndex(next);
  }

  const setCarouselSlideHeight = (slideIndex) => {
    return carouselIndex !== slideIndex ? carouselHeightInactive : {}
  }
  
  return (
    <Carousel 
      dots={false}
      ref={carouselRef}
      beforeChange={onBeforeChangeCarousel}
    >
      <div>
        <div style={setCarouselSlideHeight(0)}>
          <Form 
            id="bookingForm" 
            onFinish={props.submitFn}
            initialValues={{
              checkinTime: dayjs('12:00', 'HH:mm'),
              checkoutTime: dayjs('10:30', 'HH:mm'),
            }}
            form={bookingForm}
            validateTrigger="onChange"
          >
            <NewBookingGuestSelection 
              setGuestSearchHasNoMatch={setGuestSearchHasNoMatch}
              setSelectedGuest={setSelectedGuest}
              setShowRoomSelection={setShowRoomSelection}
            />
            { guestSearchHasNoMatch && (
              <NewGuestPrompt /> 
            ) }
            { selectedGuest && (
              <NewBookingDateSelection
                onCheckinDateSelection={onCheckinDateSelection}
                onCheckoutDateSelection={onCheckoutDateSelection}
                setCheckinTime={setCheckinTime}
                setCheckoutTime={setCheckoutTime}
              /> 
            ) }
            { selectedGuest && showRoomSelection && !roomIsLoading && (
              <NewBookingRoomSelection
                rooms={rooms}
                bookingForm={bookingForm}
                onRoomSelection={onRoomSelection}
                onRoomSelectionChange={onRoomSelectionChange}
                carouselRef={carouselRef}
              /> 
            ) }
          </Form>
        </div>
      </div>
      <div>
        <div style={setCarouselSlideHeight(1)}>
          <BookingConfirmation 
            selectedGuest={selectedGuest}
            checkinDate={checkinDate}
            checkoutDate={checkoutDate}
            carouselRef={carouselRef}
            submitBooking={submitBooking}
            durationOfStay={durationOfStay}
            roomRate={roomRate}
          />
        </div>
      </div>
    </Carousel>
  )
}