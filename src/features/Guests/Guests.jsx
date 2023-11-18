import React, { useState, useEffect } from 'react'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import { GuestAPI } from 'src/api/GuestAPI'
import { useGuestData } from 'src/hooks/useGuests'
import { NewGuestForm } from './NewGuestForm'
import { GuestTable } from './GuestTable'
import { GuestDetail } from './GuestDetail'

export default function Guests() {
  const guests = useGuestData();
  const [contentIsLoading, setLoadingState] = useState(true);
  const [newGuestFormStatus, setNewGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [editGuestFormStatus, setEditGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [showGuestDetail, setShowGuestDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [toastNotification, setToastNotification] = useState({ message: null, type: null});

  const createGuest = (formData) => {
    setLoadingState(true);
    let preppedFormData = {
      ...formData,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip
      },
      currentlyAssignedRoom: "",
      status: "good",
      storedCreditCard: {},
      history: [],
      signUpDate: new Date(),
    };
    delete preppedFormData.street
    delete preppedFormData.city
    delete preppedFormData.state
    delete preppedFormData.zip

    setNewGuestFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })

    GuestAPI.post(preppedFormData).then((res) => {
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
        }, 1200)
        setTimeout( hideDetail, 800)
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

  const showDetail = (record) => {
    setShowGuestDetail(true)
    setSelectedRecord(record)
  }

  const hideDetail = () => {
    setShowGuestDetail(false)
    setSelectedRecord(null)
  }

  const searchTable = (e) => {
    const currentSearch = e.target.value;
    setSearchValue(currentSearch);
  }

  useEffect(() => guests.getGuests(), [newGuestFormStatus, editGuestFormStatus]);

  return (
    <FeatureWrapper
      subHeaderProps={{
        feature: "Guests", 
        recordCount: guests.length,
        newRecordBtn: true,
        formStatus: newGuestFormStatus,
        search: searchTable
      }}
      newRecordComponent={<NewGuestForm submitFn={createGuest} />}
      toastNotification={toastNotification}>
      <GuestTable 
        isLoading={guests.isLoading}
        tableData={guests.records}
        onRowClick={showDetail} 
        searchTerms={searchValue} />
      <GuestDetail 
        show={showGuestDetail} 
        data={selectedRecord} 
        onClose={hideDetail}
        updateGuest={updateGuest} 
        deleteGuest={deleteGuest} 
        editGuestFormStatus={editGuestFormStatus} />
    </FeatureWrapper>
  )
}