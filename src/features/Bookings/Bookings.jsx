import React, { useEffect, useState } from 'react'
import { BookingsAPI } from 'src/api/BookingsAPI'
import { useAggregatedBookings } from 'src/hooks/useAggregatedBookings'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import BookingDetail from './BookingsDetail/Index'
import { BookingsTable } from './BookingsTable'
import NewBookingContainer from './NewBooking/Index'

export default function Bookings(props) {
  const bookings = useAggregatedBookings();
  const [newBookingFormStatus, setNewBookingFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [showBookingDetail, setShowBookingDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [toastNotification, setToastNotification] = useState({ message: null, type: null});

  async function createBooking(formData) {
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

  const deleteBooking = (id) => {
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
        setTimeout( hideDetail, 800)
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

  const showDetail = (record) => {
    setShowBookingDetail(true)
    setSelectedRecord(record)
  }

  const hideDetail = () => {
    setShowBookingDetail(false)
    setSelectedRecord(null)
  }

  const searchTable = (e) => {
    const currentSearch = e.target.value;
    setSearchValue(currentSearch);
  }

  const refetchAggregatedData = () => {
    if(newBookingFormStatus.response)
      bookings.refetchBookings()
  }

  useEffect(() => refetchAggregatedData(), [newBookingFormStatus]);

  return (
    <FeatureWrapper
      subHeaderProps={{
        feature: "Bookings", 
        recordCount: 0,
        newRecordBtn: true,
        formStatus: newBookingFormStatus,
        search: searchTable
      }}
      newRecordComponent={<NewBookingContainer submitFn={createBooking} />}
      toastNotification={toastNotification}>
      <BookingsTable 
        isLoading={bookings.isLoading}
        tableData={bookings.records}
        onRowClick={showDetail} 
        searchTerms={searchValue} />
      <BookingDetail 
        show={showBookingDetail} 
        data={selectedRecord}
        deleteBooking={deleteBooking} 
        onClose={hideDetail} />
    </FeatureWrapper>
  )
}