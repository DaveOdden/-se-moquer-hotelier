import React, { useEffect, useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import BookingDetail from './BookingsDetail/Index'
import { BookingsTable } from './BookingsTable'
import NewBookingContainer from './NewBooking/Index'
import { GuestAPI } from 'src/api/GuestAPI';
import { BookingsAPI } from 'src/api/BookingsAPI';
import { RoomsAPI } from 'src/api/RoomAPI'

export default function Bookings(props) {
  const [guests, bookings, rooms] = useQueries({
    queries: [
      { queryKey: ["guests"], queryFn: () => GuestAPI.get().then((res) => res.message) },
      { queryKey: ["bookings"], queryFn: () => BookingsAPI.get().then((res) => res.message) },
      { queryKey: ["rooms"], queryFn: () => RoomsAPI.get().then((res) => res.message) },
    ]
  })
  
  const dataIsLoading = [guests, bookings, rooms].some(query => query.isPending)
  const allDataFetched = [guests, bookings, rooms].every(query => query.isSuccess)
  const error = [guests, bookings, rooms].some(query => query.error)

  const [newBookingFormStatus, setNewBookingFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [toastNotification, setToastNotification] = useState({ message: null, type: null});

  const createBooking = formData => {
    setNewBookingFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })
    BookingsAPI.post(formData).then((res) => {
      if(res.success) {
        setTimeout(() => {
          setToastNotification({
            message: "Booking Successful",
            type: 'success'
          })
        },700)
        setTimeout(() => {
          setNewBookingFormStatus({
            loading: false, 
            response: true, 
            error: null, 
            pristine: false
          })
        },900)
      } else {
        setToastNotification({
          message: "Error. Something screwed up...",
          type: 'error'
        })
        setNewBookingFormStatus({
          loading: null, 
          response: null, 
          error: true, 
          pristine: false
        })
      }
    })
  }

  const deleteBooking = id => {
    BookingsAPI.delete(id).then((res) => {
      if(res.success) {
        setToastNotification({
          message: "Booking Deleted",
          type: 'success'
        })    
        setTimeout( () => {
          setNewBookingFormStatus({
            loading: false, 
            response: true, 
            error: null, 
            pristine: false
          })
        }, 1200)
        setTimeout( setSelectedRecord(null), 800)
      } else {
        setToastNotification({
          message: "Error. Something screwed up...",
          type: 'error'
        })
        setNewBookingFormStatus({
          loading: null, 
          response: null, 
          error: true, 
          pristine: false
        })
      }
    })
  }

  const refetchAggregatedData = () => {
    if(newBookingFormStatus.response)
      bookings.refetchBookings()
  }

  //useEffect(() => refetchAggregatedData(), [newBookingFormStatus]);

  return (
    <FeatureWrapper
      subHeaderProps={{
        feature: "Bookings", 
        recordCount: 0,
        newRecordBtn: true,
        formStatus: newBookingFormStatus,
        search: (e) => setSearchValue(e.target.value)
      }}
      toastNotification={toastNotification}
      newRecordComponent={(
        <NewBookingContainer submitFn={createBooking} />
      )}>
      <BookingsTable
        guests={guests}
        bookings={bookings}
        rooms={rooms}
        onRowClick={(record) => setSelectedRecord(record)} 
        searchTerms={searchValue} />
      <BookingDetail 
        show={() => selectedRecord !== null} 
        data={selectedRecord}
        deleteBooking={deleteBooking} 
        onClose={() => setSelectedRecord(null)} />
    </FeatureWrapper>
  )
}