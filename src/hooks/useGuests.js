import { useState, useEffect } from 'react';
import { GuestAPI } from '../api/GuestAPI';

export const useGuestAutoCompleteData = () => {
  const [guestsKeyValueSet, setGuestsForAutoComplete] = useState([]);
  const [isLoading, toggleLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);

  const getGuestData = () => {
    try {
      toggleLoading(true)
      setDataLoaded(false)
      GuestAPI.getGuestsForAutocomplete().then((res) => {
        setGuestsForAutoComplete(res.message)
        setDataLoaded(true)
      })
    }
    catch(err) {
      setError(err)
    } finally {
      toggleLoading(false)
    }
  }

  useEffect(() => getGuestData, [])

  return { guestsKeyValueSet, isLoading, dataLoaded, error }
}

export const useGuestData = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, toggleLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const refetchRecords = () => getGuests()

  const getGuests = () => {
    try {
      toggleLoading(true)
      setDataLoaded(false)
      GuestAPI.get().then((res) => {
        setRecords(res.message)
        setDataLoaded(true)
      })
    }
    catch(err) {
      setError(err)
    } finally {
      toggleLoading(false)
    }
  }

  useEffect(() => getGuests, [])

  return { records, isLoading, dataLoaded, error, refetchRecords }
}