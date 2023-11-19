import React, { useState, createContext } from 'react';
import { NewGuest } from './NewGuestWrapper'
import { NewBookingFlow } from './NewBookingFlow'
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

export const CurrentModalState = createContext(null);

export const NewBookingContainer = (props) => {
  const [currentView, setCurrentView] = useState(null);
  const { submitFn } = props;

  return (
    <ErrorBoundary>
      <CurrentModalState.Provider value={{ currentView, setCurrentView }}>
        { (() => { 
          switch(currentView) {
            case 'newGuestForm': 
              return <NewGuest />
            default:
              return <NewBookingFlow submitFn={submitFn} />
          }
        })() }
      </CurrentModalState.Provider>
    </ErrorBoundary>
  )
}