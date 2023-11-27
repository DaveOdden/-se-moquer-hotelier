import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Form } from 'antd'
import { NewGuestPrompt } from '../NewGuestPrompt'
import { NewBookingGuestSelection } from './NewBookingGuestSelection'
import { NewBookingDateSelection } from './NewBookingDateSelection'
import { NewBookingRoomSelection } from './NewBookingRoomSelection'
import { NewBookingSubmitButton } from './NewBookingSubmitButton'
import { BookingsAPI } from 'src/api/BookingsAPI'
import { calculateDuration } from 'src/utils/dateHelpers.js'
import { useSettings } from 'src/hooks/useSettingsQuery'

export const NewBookingForm = (props) => {
  const { returnFormData } = props
  const [ bookingForm ] = Form.useForm()
  const { data: settings } = useSettings()

  /* Guest States */
  const [guestSearchHasResults, setGuestSearchHasResults] = useState(undefined)
  const [selectedGuest, setSelectedGuest] = useState(undefined)

  /* Date / Time States */
  const [checkinDate, setCheckinDate] = useState(null)
  const [checkoutDate, setCheckoutDate] = useState(null)
  const [checkinTime, setCheckinTime] = useState(dayjs('2.30.00', 'HH:mm:ss'))
  const [checkoutTime, setCheckoutTime] = useState(dayjs('10.30.00', 'HH:mm:ss'))
  const [durationOfStay, setDurationOfStay] = useState(0)

  /* Room States */
  const [rooms, setRooms] = useState([]);
  const [roomIsLoading, setRoomLoadingState] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(-1)

  let showDateSelection = selectedGuest
  let showRoomSelection = selectedGuest && checkinDate && checkoutDate && checkinTime && checkoutTime
  let showNewGuestPrompt = guestSearchHasResults === null

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
    let formattedCheckinTime = dayjs.isDayjs(checkinTime) ? checkinTime.format('HH:mm:ss') : checkinTime
    let formattedCheckoutTime = dayjs.isDayjs(checkoutTime) ? checkoutTime.format('HH:mm:ss') : checkoutTime
    let data = {
      formData: {
        guest: selectedGuest._id,
        room: selectedRoom,
        checkinDate: dayjs(`${checkinDate.format('YYYY-MM-DD')}T${formattedCheckinTime}`).toISOString(),
        checkoutDate: dayjs(`${checkoutDate.format('YYYY-MM-DD')}T${formattedCheckoutTime}`).toISOString(),
        paid: true,
        billing: {
          rate: settings?.properties?.roomRate,
          days: durationOfStay,
          additional: 0,
        }
      },
      guestDetails: {...selectedGuest},
    }

    returnFormData(data)
  }

  useEffect(() => { // update checkin/checkout time from settings
    if(settings) {
      console.log(settings)
      setCheckinTime(dayjs(settings.properties.checkoutTime, 'HH:mm:ss'))
      setCheckoutTime(dayjs(settings.properties.checkoutTime, 'HH:mm:ss'))
    }
  }, [settings])

  useEffect(() => populateRoomDropdown(), [checkinDate, checkoutDate])

  return (
    <Form 
      id="bookingForm" 
      initialValues={{
        checkinTime: dayjs(checkinTime, 'HH:mm:ss'),
        checkoutTime: dayjs(checkoutTime, 'HH:mm:ss'),
      }}
      form={bookingForm}
      validateTrigger="onChange">
      <NewBookingGuestSelection 
        setSelectedGuest={setSelectedGuest} 
        setGuestSearchHasResults={setGuestSearchHasResults} />
      { showNewGuestPrompt && (
        <NewGuestPrompt /> 
      ) }
      { showDateSelection && (
        <NewBookingDateSelection
          checkinTime={settings.properties.checkinTime}
          checkoutTime={settings.properties.checkoutTime}
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
          <NewBookingSubmitButton bookingForm={bookingForm} moveToNextStep={moveToNextStep} />
        </>
      ) }
    </Form>
  )
}