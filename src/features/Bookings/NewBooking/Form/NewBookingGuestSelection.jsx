import { AutoComplete, Form, Input } from 'antd'
import { GuestAPI } from '../../../../api/GuestAPI.js'
import { useGuestAutoComplete } from 'src/hooks/useGuestsQuery'
import { onGuestSearch } from 'src/features/Bookings/utils/newBookingGuestSearch'

export const NewBookingGuestSelection = (props) => {
  const guest = useGuestAutoComplete()
  const { setSelectedGuest, setGuestSearchHasResults } = props;

  const onSearch = (query) => {
    setGuestSearchHasResults(onGuestSearch(query, guest.data))
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
        options={guest.data}
        filterOption={true}
        onSearch={onSearch}
        onSelect={onGuestSelection}>
        <Input.Search
          placeholder={guest.isLoading ? 'Loading...' : 'Search by Name'} 
          disabled={guest.isLoading} />
      </AutoComplete>
    </Form.Item>
  )
}