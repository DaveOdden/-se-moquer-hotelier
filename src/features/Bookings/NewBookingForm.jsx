import React, { useState, useEffect, useRef } from 'react';
import { GuestAPI } from '../../api/GuestAPI'
import { BookingsAPI } from '../../api/BookingsAPI'
import NewGuestForm from '../Guests/NewGuestForm'
import NewGuestPrompt from './NewGuestPrompt'
import { AutoComplete, Space, Flex, Form, Input, Button, DatePicker, TimePicker, Typography, Carousel, Descriptions, Divider, Statistic } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;
import dayjs from 'dayjs';

const carouselHeightInactive = {
  height: 0,
  overflow: 'hidden'
}

export default function NewBookingForm(props) {
  const roomRate = 140;
  const carouselRef = useRef()
  const [bookingForm] = Form.useForm();

  /* Guest States */
  const [guests, setGuests] = useState([]);
  const [guestsKeyValueSet, setGuestsForAutoComplete] = useState([]);
  const [guestIsLoading, setGuestLoadingState] = useState(true);
  const [guestSearchHasNoMatch, setGuestSearchHasNoMatch] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(false);
  const [showNewGuestForm, toggleNewGuestForm] = useState(false);

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
  
  const [carouselIndex, setCarouselIndex] = useState(0)

  const [confirmationIsLoading, setConfirmationLoading] = useState(false)
  const [bookingIsSuccess, setBookingIsSuccess] = useState(false)

  const getGuestData = () => {
    GuestAPI.getGuestsForAutocomplete().then((res) => {
      setGuestsForAutoComplete(res.message)
      setGuestLoadingState(false)
    })
  }

  const onGuestSearch = (query) => {
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
      setGuestSearchHasNoMatch(true)
      setSelectedGuest(false)
      setShowRoomSelection(false)
    } else if(hasMatch && guestSearchHasNoMatch) {
      setGuestSearchHasNoMatch(false)
      setShowRoomSelection(checkinTime && checkoutTime)
    }
  }

  const onGuestSelection = (value, data) => {
    GuestAPI.getOne(data.id).then((res) => {
      setSelectedGuest(res.message)
    })
  }

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

  const allFieldsComplete = () => {
    return bookingForm.guest !== '' && 
           bookingForm.checkinDate && 
           bookingForm.checkoutDate && 
           bookingForm.checkinTime && 
           bookingForm.checkoutTime && 
           bookingForm.room
  }

  const nextButtonIsDisabled = () => {
    if(!allFieldsComplete() || bookingForm.getFieldsError().filter(({ errors }) => errors.length).length > 0) {
      return false
    }
    return true
  }

  useEffect(() => getGuestData, [])

  return (
    <>
      <Carousel 
        dots={false}
        ref={carouselRef}
        beforeChange={onBeforeChangeCarousel}>
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
              <Form.Item 
                name="guest" 
                label="Guest" 
                style={{marginTop: '32px'}}
                rules={[
                  {
                    required: true,
                    message: 'Select a guest',
                  },
                ]}
              >
                <AutoComplete
                  options={guestsKeyValueSet}
                  filterOption={true}
                  onSearch={onGuestSearch}
                  onSelect={onGuestSelection}
                >
                  <Input.Search placeholder="Search By Name" />
                </AutoComplete>
              </Form.Item>
              { guestSearchHasNoMatch && <NewGuestPrompt toggleNewGuestForm={toggleNewGuestForm} /> }
              { selectedGuest && 
                <>
                  <Space>
                    <Form.Item
                      name="checkinDate"
                      label="CheckIn Date"
                      rules={[
                        {
                          required: true,
                          message: 'Check-in date is required',
                        },
                      ]}
                    >
                      <DatePicker
                        onChange={onCheckinDateSelection}
                      />
                    </Form.Item>
                    <Form.Item 
                      name="checkinTime" 
                      label="Checkin Time"
                      rules={[
                        {
                          required: true,
                          message: 'Check-in time is required',
                        },
                      ]}
                    >
                      <TimePicker 
                        use12Hours 
                        minuteStep={15} 
                        format="h:mm a"
                        onSelect={(val) => setCheckinTime(val)}
                      />
                    </Form.Item>
                  </Space>
                  <Space>
                    <Form.Item 
                      name="checkoutDate" 
                      label="Checkout Date"
                      rules={[
                        {
                          required: true,
                          message: 'Check-out date is required',
                        },
                      ]}
                    >
                      <DatePicker 
                        onChange={onCheckoutDateSelection}
                      />
                    </Form.Item>
                    <Form.Item 
                      name="checkoutTime" 
                      label="Checkout Time"
                      rules={[
                        {
                          required: true,
                          message: 'Check-out time is required',
                        },
                      ]}
                    >
                      <TimePicker 
                        use12Hours 
                        minuteStep={15} 
                        format="h:mm a"
                        onSelect={(val) => setCheckoutTime(val)}
                      />
                    </Form.Item>
                  </Space> 
                  { showRoomSelection && !roomIsLoading &&
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
                  }
                </>
              }
            </Form>
          </div>
        </div>
        <div>
          <div style={setCarouselSlideHeight(1)}>
            <Space direction="vertical">
              <Descriptions 
                size="small"
                style={{marginTop: '16px', display: 'flex', justifyContent: 'flex-end'}} 
                column={1}
              >
                <Descriptions.Item label="Guest Name">{selectedGuest.firstName}</Descriptions.Item>
                <Descriptions.Item label="License #">70001011</Descriptions.Item>
                <Descriptions.Item label="Check In">{dayjs(checkinDate).format('dddd - MMMM DD, YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Check Out">{dayjs(checkoutDate).format('dddd - MMMM DD, YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Payment">Mock Payment</Descriptions.Item>
              </Descriptions>
              <Divider style={{margin: 0}}/>
              <Flex justify="space-between">
              <Descriptions column={1}>
                <Descriptions.Item label="Rate">${roomRate} x {durationOfStay}</Descriptions.Item></Descriptions>
                <Statistic title="Total" style={{textAlign: 'right', marginBottom: '32px'}} value={`$${roomRate*durationOfStay}`} />
              </Flex>
            </Space>
            <Flex justify="space-between">
              <Button onClick={() => carouselRef.current.goTo(0)}>Back</Button>
              <Button type="primary" onClick={submitBooking}>Confirm Booking</Button>
            </Flex>
          </div>
        </div>
      </Carousel>
      { showNewGuestForm && 
        <>
          <Button 
            type="link"
            icon={<ArrowLeftOutlined />} 
            onClick={() => {toggleNewGuestForm(false);setGuestSearchHasNoMatch(false);}}
            size="small"
          >
            Back to Booking Form
          </Button>
          <NewGuestForm submitFn={() => {}} />
        </>
      }
    </>
  )
}