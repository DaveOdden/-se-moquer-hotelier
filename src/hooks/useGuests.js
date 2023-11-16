import React, { useState, useEffect } from 'react';
import { GuestAPI } from '../api/GuestAPI';

export const useGuestAutoCompleteData = () => {
  const [guestsKeyValueSet, setGuestsForAutoComplete] = useState([]);

  const getGuestData = () => {
    GuestAPI.getGuestsForAutocomplete().then((res) => {
      setGuestsForAutoComplete(res.message)
    })
  }

  useEffect(() => getGuestData, [])

  return guestsKeyValueSet

}

export const useGuestData = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, toggleLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGuests = () => {
    toggleLoading(true)
    GuestAPI.get().then((res) => {
      setRecords(res.message)
      toggleLoading(false)
    })
  }

  useEffect(() => getGuests, [])

  return { records, isLoading, error, getGuests }

}