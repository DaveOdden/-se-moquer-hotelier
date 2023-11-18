import React, { useState, useEffect } from 'react';
import { Space, Form, Input, Button } from 'antd';

export default function EditGuestForm(props) {
  const [formData, setFormData] = useState(props.formData);
  const [editGuestFormStatus, setEditGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});

  const submitForm = (editedFormData) => {
    props.submitFn(formData._id, editedFormData)
  }

  useEffect(() => {
    props.formData ? setFormData(props.formData) : null
  }, [props.formData]);

  useEffect(() => {
    setEditGuestFormStatus(props.editGuestFormStatus)
  }, [props.editGuestFormStatus]);

  return (
    <Form id="guestsForm" onFinish={submitForm} initialValues={formData}>
      <Form.Item name="firstName" label="First Name" disabled={editGuestFormStatus.loading}>
        <Input placeholder="e.g. John" disabled={editGuestFormStatus.loading} />
      </Form.Item>
      <Form.Item name="lastName" label="Last Name" disabled={editGuestFormStatus.loading}>
        <Input placeholder="Last Name"disabled={editGuestFormStatus.loading} />
      </Form.Item>
      <Form.Item name="email" label="Email" disabled={editGuestFormStatus.loading}>
        <Input placeholder="Email" disabled={editGuestFormStatus.loading} />
      </Form.Item>
      <Form.Item name="phone" label="Phone" disabled={editGuestFormStatus.loading}>
        <Input placeholder="Phone" disabled={editGuestFormStatus.loading} />
      </Form.Item>
      <Form.Item name="dob" label="Date of Birth" disabled={editGuestFormStatus.loading}>
        <Input placeholder="Date of Birth" disabled={editGuestFormStatus.loading} />
      </Form.Item>
      <Form.Item name={['address', 'street']} label="Street Address" disabled={editGuestFormStatus.loading}>
        <Input placeholder="Street Address" value={formData.address.street} disabled={editGuestFormStatus.loading}/>
      </Form.Item>

      <Space>
        <Form.Item name={['address', 'city']} label="City" disabled={editGuestFormStatus.loading}>
          <Input placeholder="City" value={formData.address.city} disabled={editGuestFormStatus.loading}/>
        </Form.Item>
        <Form.Item name={['address', 'state']} label="State" disabled={editGuestFormStatus.loading}>
          <Input placeholder="State" value={formData.address.state} disabled={editGuestFormStatus.loading}/>
        </Form.Item>
        <Form.Item name={['address', 'zip']} label="Zip Code" disabled={editGuestFormStatus.loading}>
          <Input placeholder="Zip Code" value={formData.address.zip} disabled={editGuestFormStatus.loading}/>
        </Form.Item>
      </Space>

      <Form.Item name="licenseNumber" disabled={editGuestFormStatus.loading}>
        <Input placeholder="License Number" disabled={editGuestFormStatus.loading}/>
      </Form.Item>
      <Form.Item name="notes" disabled={editGuestFormStatus.loading}>
        <Input.TextArea placeholder="Notes" disabled={editGuestFormStatus.loading}/>
      </Form.Item>
      <Form.Item disabled={editGuestFormStatus.loading}>
        <Button  type="primary" key="submit" htmlType="submit" disabled={editGuestFormStatus.loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}