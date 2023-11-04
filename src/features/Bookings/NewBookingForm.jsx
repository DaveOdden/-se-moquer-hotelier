import React, { useState, useEffect } from 'react';
import { GuestAPI } from '../../api/GuestAPI'
import { BookingsAPI } from '../../api/BookingsAPI'
import NewGuestForm from '../Guests/NewGuestForm'
import { AutoComplete, Space, Flex, Form, Input, Button, DatePicker, TimePicker, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Text } = Typography;
import dayjs from 'dayjs';

export default function NewBookingForm(props) {
  const [guests, setGuests] = useState([]); // unused (general store)
  const [guestsKeyValueSet, setGuestsForAutoComplete] = useState([]);
  const [guestSearchHasNoMatch, setGuestSearchHasNoMatch] = useState(false);
  const [guestSelected, setGuestSelected] = useState(false);
  const [showNewGuestForm, toggleNewGuestForm] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [guestIsLoading, setGuestLoadingState] = useState(true);
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [roomIsLoading, setRoomLoadingState] = useState(true);
  const [showRoomSelection, setShowRoomSelection] = useState(false)

  const getGuestData = () => {
    GuestAPI.get('keyvaluepair').then((res) => {
      setGuests(res.message)
      setGuestsForAutoComplete(res.keyvalpair)
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
      console.log('no match')
      setGuestSearchHasNoMatch(true)
      setGuestSelected(false)
      setShowRoomSelection(false)
    } else if(hasMatch && guestSearchHasNoMatch) {
      setGuestSearchHasNoMatch(false)
    }
  }

  const onGuestSelection = () => {
    setGuestSelected(true)
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
        setRoomLoadingState(true)
        BookingsAPI.getRoomsByAvailability(dayjs(checkinDate).format('YYYY-MM-DD'), dayjs(checkoutDate).format('YYYY-MM-DD')).then((res) => {
          console.log(res);
          setShowRoomSelection(true)
          setRooms(res.message.roomsWithAvailabilityKeyVal)
          setRoomLoadingState(false)
        })
      }
    }
  }

  useEffect(() => getGuestData, [])

  return (
    <>
      { !showNewGuestForm && !guestIsLoading &&
      <Form id="bookingForm" onFinish={props.submitFn}>
        <Form.Item name="name" label="Guest" style={{marginTop: '32px'}}>
          <AutoComplete
            options={guestsKeyValueSet}
            filterOption={true}
            onSearch={onGuestSearch}
            onSelect={onGuestSelection}
          >
            <Input.Search placeholder="Search By Name" />
          </AutoComplete>
        </Form.Item>
        { guestSearchHasNoMatch && 
          <Flex align="center" justify="space-between">
            <Text style={{display: 'inline-block', fontSize: '.75rem'}}>
              <span style={{fontWeight: 'bold'}}>This guest is not in our system.</span>
              <div>Register this individual to start the booking process.</div>
            </Text>
            <Button type="primary" onClick={() => toggleNewGuestForm(true)}>
              Create New Guest
            </Button>
          </Flex>
        }
        { guestSelected && 
          <>
            <Space>
              <Form.Item name="checkinDate" label="CheckIn Date">
                <DatePicker
                  onChange={onCheckinDateSelection}
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
                <DatePicker 
                  onChange={onCheckoutDateSelection}
                />
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
            { showRoomSelection && !roomIsLoading &&
              <>
                <Form.Item name="rooms" label={`Available Rooms ${rooms.length ? `(${rooms.length})` : ''}`}>
                  <AutoComplete
                    options={rooms}
                    filterOption={true}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" key="submit" htmlType="submit" disabled>
                    Submit
                  </Button>
                </Form.Item>
              </>
            }
          </>
        }
      </Form>
      }
      { showNewGuestForm && 
        <>
          <Button 
            type="link"
            icon={<ArrowLeftOutlined />} 
            onClick={() => {toggleNewGuestForm(false);setGuestSearchHasNoMatch(false);}}
            size="small"
            style={{margin: '16px 0 32px 0'}}
          >
            Back to Booking Form
          </Button>
          <NewGuestForm submitFn={() => {}} />
        </>
      }
    </>
  )
}