import React, { useContext } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import NewGuestForm from '../Guests/NewGuestForm'
import { CurrentModalState } from './NewBookingForm';

export default function NewBookingNewGuest(props) {
  const { setCurrentView } = useContext(CurrentModalState);

  return (
    <>
      <Button 
        type="link"
        icon={<ArrowLeftOutlined />} 
        onClick={() => setCurrentView('newBookingForm')}
        size="small"
      >
        Back to Booking Form
      </Button>
      <NewGuestForm submitFn={() => {}} />
    </>
  )
}