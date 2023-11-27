import { useState } from 'react'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import { useGuests, useCreateGuest, useUpdateGuest, useDeleteGuest } from 'src/hooks/useGuestsQuery'
import { NewGuestForm } from './NewGuestForm'
import { GuestTable } from './GuestTable'
import { GuestDetail } from './GuestDetail'
import { convertFormDataForAPI } from './utils/guestHelpers'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary'

export default function Guests() {
  const guests = useGuests();
  const { mutate: addGuest } = useCreateGuest()
  const { mutate: modifyGuest } = useUpdateGuest()
  const { mutate: removeGuest } = useDeleteGuest()

  const [newGuestFormStatus, setNewGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true})
  const [editGuestFormStatus, setEditGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true})
  const [selectedGuestId, setSelectedGuestId] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [toastNotification, setToastNotification] = useState({ message: null, type: null});

  const createGuest = formData => {
    setNewGuestFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })
    addGuest(convertFormDataForAPI(formData), {
      onSettled: (response) => onCreateSettled(response)
    })
  }

  const onCreateSettled = response => {
    setNewGuestFormStatus({
      loading: false, 
      response: response.success ? true : null, 
      error: response.success ? null : true, 
      pristine: false
    })
    popToast(response)
  }

  const updateGuest = (id, formData) => {
    let payload = {
      ...formData,
      lastUpdated: new Date(),
    };

    setEditGuestFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })

    modifyGuest({id, payload}, {
      onSettled: (response) => onUpdateSettled(response)
    })
  }

  const onUpdateSettled = response => {
    setEditGuestFormStatus({
      loading: false, 
      response: response.success ? true : null, 
      error: response.success ? null : true, 
      pristine: false
    })
    popToast(response)
  }

  const deleteGuest = id => {
    removeGuest(id, {
      onSettled: (response) => {
        popToast(response)
        exitDrawerAfterDelete(response)
      }
    })
  }

  const exitDrawerAfterDelete = response => {
    selectedGuestId && response.success == true ? setSelectedGuestId(null) : null
  }

  const popToast = response => {
    setToastNotification({
      message: response.message || `${response.status ? `${response.status}`: ''} Error: Something Went Wrong`,
      type: response.success ? 'success' : 'error' 
    })
  }

  return (
    <ErrorBoundary>
      <FeatureWrapper
        subHeaderProps={{
          featureName: "Guests", 
          recordCount: guests?.data?.length,
          newRecordBtn: true,
          newRecordStatus: newGuestFormStatus,
          search: (e) => setSearchValue(e.target.value)
        }}
        toastNotification={toastNotification}
        newRecordComponent={(
          <NewGuestForm submitFn={createGuest} />
        )}>
        <GuestTable 
          isLoading={guests?.isPending}
          tableData={guests?.data}
          onRowClick={(record) => setSelectedGuestId(record._id)} 
          searchTerms={searchValue} />
        <GuestDetail 
          guestId={selectedGuestId} 
          updateGuest={updateGuest} 
          deleteGuest={deleteGuest} 
          formStatus={editGuestFormStatus}
          showDrawer={() => selectedGuestId !== null} 
          hideDrawer={() => setSelectedGuestId(null)} />
      </FeatureWrapper>
    </ErrorBoundary>
  )
}