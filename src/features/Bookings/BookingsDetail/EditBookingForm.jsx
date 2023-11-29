import { Space, Form, Input, Button } from 'antd';
import { NewBookingRoomSelection } from 'src/features/Bookings/NewBooking/Form/NewBookingRoomSelection'
import { NewBookingDateSelection } from 'src/features/Bookings/NewBooking/Form/NewBookingDateSelection'

export const EditBookingForm = (props) => {
  const { formData, formStatus, formSubmit } = props
  console.log(formData)

  const submitForm = editedFormData => formSubmit(formData._id, editedFormData)

  return (
    <Form id="editBookingForm" onFinish={submitForm} initialValues={formData}>
      <Form.Item name={['guest', 'fullName']} label="Guest Name" extra="Guest cannot be changed" disabled>
        <Input placeholder="e.g. John" disabled />
      </Form.Item>
      <Form.Item disabled={formStatus.loading} style={{textAlign: 'right', marginBottom: '0'}}>
        <Button  type="primary" key="submit" htmlType="submit" disabled={formStatus.loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}