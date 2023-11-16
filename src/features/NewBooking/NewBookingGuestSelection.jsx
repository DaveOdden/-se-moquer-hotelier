import React from 'react';
import { AutoComplete, Form, Input } from 'antd';
import { GuestAPI } from '../../api/GuestAPI'
import { useGuestAutoCompleteData } from '../../hooks/useGuests.js';

export const NewBookingGuestSelection = (props) => {
  const guestsKeyValueSet = useGuestAutoCompleteData()
  const { setGuestSearchHasNoMatch, setSelectedGuest, setShowRoomSelection } = props;

  const onGuestSearch = (query) => {
    let hasMatch = false;
    for (const el of guestsKeyValueSet) {
      let hasValueMatch, hasLabelMatch = false;
      hasLabelMatch = el.label.indexOf(query) !== -1 ? true : false
      hasValueMatch = el.value.indexOf(query) !== -1 ? true : false
      if(hasLabelMatch || hasValueMatch) {
        hasMatch = true
        break;
      }
    }
    if(!hasMatch) {
      setGuestSearchHasNoMatch(true)
      setSelectedGuest(false)
      setShowRoomSelection(false)
    } else if(hasMatch && guestSearchHasNoMatch) {
      setGuestSearchHasNoMatch(false)
      setShowRoomSelection(checkinTime && checkoutTime)
    }
  }

  const onGuestSelection = (value, data) => {
    GuestAPI.getOne(data.id).then((res) => {
      setSelectedGuest(res.message)
    })
  }

  return (
    <Form.Item 
      name="guest" 
      label="Guest" 
      style={{marginTop: '32px'}}
      rules={[
        {
          required: true,
          message: 'Select a guest',
        },
      ]}
    >
      <AutoComplete
        options={guestsKeyValueSet}
        filterOption={true}
        onSearch={onGuestSearch}
        onSelect={onGuestSelection}
      >
        <Input.Search placeholder="Search By Name" />
      </AutoComplete>
    </Form.Item>
  )
}