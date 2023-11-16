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
  const [guests, setGuests] = useState([]);

  const getGuestData = () => {
    GuestAPI.get().then((res) => {
      setGuests(res.message)
    })
  }

  useEffect(() => getGuestData, [])

  return guests

}