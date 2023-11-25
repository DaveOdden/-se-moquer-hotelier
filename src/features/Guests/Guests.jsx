import React, { useState, useEffect } from 'react'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import { GuestAPI } from 'src/api/GuestAPI'
import { useGuests } from 'src/hooks/useGuestsQuery'
import { NewGuestForm } from './NewGuestForm'
import { GuestTable } from './GuestTable'
import { GuestDetail } from './GuestDetail'
import { convertFormDataForAPI } from './utils/guestHelpers'

export default function Guests() {
  const guests = useGuests();
  const [contentIsLoading, setLoadingState] = useState(true);
  const [newGuestFormStatus, setNewGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [editGuestFormStatus, setEditGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [showGuestDetail, setShowGuestDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [toastNotification, setToastNotification] = useState({ message: null, type: null});

  const createGuest = (formData) => {
    setLoadingState(true);
    setNewGuestFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })

    GuestAPI.post(convertFormDataForAPI(formData)).then((res) => {
      if(res.success) {
        setLoadingState(false);
        setNewGuestFormStatus({
          loading: false, 
          response: true, 
          error: null, 
          pristine: false
        })
        setToastNotification({
          message: 'Success. Guest Added',
          type: 'success'
        })
        guests.refetchRecords()
      } else {
        setNewGuestFormStatus({
          loading: false, 
          response: null, 
          error: true, 
          pristine: false
        })
        setToastNotification({
          message: 'Error. Something screwed up...',
          type: 'error'
        })
      }
    })
  }

  const updateGuest = (id, formData) => {
    let preppedFormData = {
      ...formData,
      lastUpdated: new Date(),
    };

    setEditGuestFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })

    GuestAPI.update(id, preppedFormData).then((res) => {
      if(res.success) {
        setToastNotification({
          message: 'Success. Guest updated',
          type: 'success'
        })
        setTimeout( () => {
          setEditGuestFormStatus({
            loading: false, 
            response: true, 
            error: null, 
            pristine: false
          })
          guests.refetchRecords()
        }, 1200)
        setTimeout( setSelectedRecord(null), 800)
      } else {
        setToastNotification({
          message: 'Error. Something screwed up...',
          type: 'error'
        })
        setEditGuestFormStatus({
          loading: false, 
          response: null, 
          error: true, 
          pristine: false
        })
      }
    })
  }

  const deleteGuest = (id) => {
    GuestAPI.delete(id).then((res) => {
      if(res.success) {
        setToastNotification({
          message: 'Success. Guest deleted',
          type: 'success'
        })
        setTimeout( () => {
          setEditGuestFormStatus({
            loading: false, 
            response: true, 
            error: null, 
            pristine: false
          })
          guests.refetchRecords()
        }, 1200)
        setTimeout( hideDetail, 800)
      } else {
        setToastNotification({
          message: 'Error. Something screwed up...',
          type: 'error'
        })
        setEditGuestFormStatus({
          loading: null, 
          response: null, 
          error: true, 
          pristine: false
        })
      }
    })
  }

  return (
    <FeatureWrapper
      subHeaderProps={{
        feature: "Guests", 
        recordCount: guests?.data?.length,
        newRecordBtn: true,
        formStatus: newGuestFormStatus,
        search: (e) => setSearchValue(e.target.value)
      }}
      toastNotification={toastNotification}
      newRecordComponent={(
        <NewGuestForm submitFn={createGuest} />
      )}>
      <GuestTable 
        isLoading={guests?.isPending}
        tableData={guests?.data}
        onRowClick={(record) => setSelectedRecord(record)} 
        searchTerms={searchValue} />
      <GuestDetail 
        show={() => selectedRecord !== null} 
        data={selectedRecord} 
        onClose={() => setSelectedRecord(null)}
        updateGuest={updateGuest} 
        deleteGuest={deleteGuest} 
        editGuestFormStatus={editGuestFormStatus} />
    </FeatureWrapper>
  )
}