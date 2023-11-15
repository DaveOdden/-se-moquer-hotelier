import React, { useState, createContext } from 'react';
import NewBookingNewGuest from './NewBookingNewGuest'
import NewBookingCarousel from './NewBookingCarousel'

export const CurrentModalState = createContext(null);

export default function NewBookingForm(props) {
  const [currentView, setCurrentView] = useState(null);
  const { submitFn } = props;

  return (
    <CurrentModalState.Provider value={{ currentView, setCurrentView }}>
      { (() => { 
        switch(currentView) {
          case 'newGuestForm': 
            return <NewBookingNewGuest />
          default:
            return <NewBookingCarousel submitFn={submitFn} />
        }
      })() }
    </CurrentModalState.Provider>
  )
}