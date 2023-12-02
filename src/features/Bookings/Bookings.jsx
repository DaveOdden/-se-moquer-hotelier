import { useState } from 'react'
import { useCreateBooking, useUpdateBooking, useDeleteBooking } from 'src/hooks/useBookingsQuery'
import { useAllFeatures } from 'src/hooks/useAllQuery'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import { BookingsTable } from './BookingsTable'
import BookingDetail from './BookingsDetail/Index'
import NewBookingContainer from './NewBooking/Index'

export default function Bookings(props) {
  const [guests, bookings, rooms] = useAllFeatures()
  const { mutate: addBooking } = useCreateBooking()
  const { mutate: modifyBooking } = useUpdateBooking()
  const { mutate: removeBooking } = useDeleteBooking()

  const dataIsLoading = [guests, bookings, rooms].some(query => query.isPending)
  const allDataFetched = [guests, bookings, rooms].every(query => query.isSuccess)
  const error = [guests, bookings, rooms].some(query => query.error)

  const [newBookingFormStatus, setNewBookingFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [editBookingFormStatus, setEditBookingFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [fullBookingDetails, setFullBookingDetails] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [toastNotification, setToastNotification] = useState({ message: null, type: null});

  const createBooking = formData => {
    setNewBookingFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })
    addBooking(formData, {
      onSettled: (response) => onCreateSettled(response)
    })
  }

  const onCreateSettled = (response) => {
    setTimeout( () => {
      setNewBookingFormStatus({
        loading: false, 
        response: response.success ? true : null, 
        error: response.success ? null : true, 
        pristine: false
      })
    }, 1200)
    popToast(response)
  }

  const updateBooking = newData => {
    setEditBookingFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })
    modifyBooking(newData, {
      onSettled: (response) => onUpdateSettled(response)
    })
  }

  const onUpdateSettled = (response) => {
    setEditBookingFormStatus({
      loading: false, 
      response: response.success ? true : null, 
      error: response.success ? null : true, 
      pristine: false
    })
    popToast(response)
  }

  const deleteBooking = id => {
    removeBooking(id, {
      onSettled: (response) => onDeleteSettled(response)
    })
  }

  const onDeleteSettled = (res) => {
    popToast(res)
    res.success ? setTimeout( setSelectedRecord(null), 800) : null
  }

  const popToast = response => {
    setToastNotification({
      message: response.message || `${response.status ? `${response.status}`: ''} Error: Something Went Wrong`,
      type: response.success ? 'success' : 'error' 
    })
  }

  const resetEditForm = () => {
    setEditBookingFormStatus({
      loading: false, 
      response: null, 
      error: null, 
      pristine: true
    })
  }

  return (
    <ErrorBoundary>
      <FeatureWrapper
        subHeaderProps={{
          featureName: "Bookings", 
          recordCount: 0,
          newRecordBtn: true,
          newRecordStatus: newBookingFormStatus,
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
          onRowClick={(record) => {
            setFullBookingDetails(record)
            setSelectedBookingId(record._id)
          }} 
          searchTerms={searchValue} />
        <BookingDetail 
          bookingId={selectedBookingId}
          fullBookingDetails={fullBookingDetails} // aggregated guest and room data with row's booking data
          updateBooking={updateBooking} 
          deleteBooking={deleteBooking} 
          formStatus={editBookingFormStatus} 
          resetEditForm={resetEditForm}
          showDrawer={() => selectedBookingId !== null}
          hideDrawer={() => setSelectedBookingId(null)} />
      </FeatureWrapper>
    </ErrorBoundary>
  )
}