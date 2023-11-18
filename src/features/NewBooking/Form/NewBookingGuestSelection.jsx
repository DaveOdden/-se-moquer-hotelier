import React from 'react';
import { AutoComplete, Form, Input } from 'antd';
import { GuestAPI } from '../../../api/GuestAPI.js'
import { useGuestAutoCompleteData } from '../../../hooks/useGuests.js';

export const NewBookingGuestSelection = (props) => {
  const guest = useGuestAutoCompleteData()
  const { setSelectedGuest } = props;

  const onGuestSearch = (query) => {
    let hasMatch = false;
    for (const el of guest.guestsKeyValueSet) {
      let hasValueMatch, hasLabelMatch = false;
      hasLabelMatch = el.label.indexOf(query) !== -1 ? true : false
      hasValueMatch = el.value.indexOf(query) !== -1 ? true : false
      if(hasLabelMatch || hasValueMatch) {
        hasMatch = true
        break;
      }
    }
    if(!hasMatch) {
      setSelectedGuest(null)
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
      rules={[{
        required: true,
        message: 'Select a guest',
      }]}>
      <AutoComplete
        options={guest.guestsKeyValueSet}
        filterOption={true}
        onSearch={onGuestSearch}
        onSelect={onGuestSelection}>
        <Input.Search
          placeholder={guest.isLoading ? 'Loading...' : 'Search by Name'} 
          disabled={guest.isLoading} />
      </AutoComplete>
    </Form.Item>
  )
}