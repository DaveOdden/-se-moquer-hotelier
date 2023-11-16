import { Space, Form, Input, Button } from 'antd';

export const NewGuestForm = (props) => {
  return (
    <Form id="guestsForm" onFinish={props.submitFn}>
      <Form.Item name="firstName" label="First Name" preserve={false}>
        <Input placeholder="e.g. John"/>
      </Form.Item>
      <Form.Item name="lastName" label="Last Name">
        <Input placeholder="Last Name"/>
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input placeholder="Email"/>
      </Form.Item>
      <Form.Item name="phone" label="Phone">
        <Input placeholder="Phone"/>
      </Form.Item>
      <Form.Item name="dob" label="Date of Birth">
        <Input placeholder="YYYY-MM-DD"/>
      </Form.Item>
      <Form.Item name="street" label="Street Address">
        <Input placeholder="Street Address"/>
      </Form.Item>

      <Space>
        <Form.Item name="city" label="City">
          <Input placeholder="City"/>
        </Form.Item>
        <Form.Item name="state" label="State">
          <Input placeholder="State"/>
        </Form.Item>
        <Form.Item name="zip" label="Zip Code">
          <Input placeholder="Zip Code"/>
        </Form.Item>
      </Space>

      <Form.Item name="licenseNumber">
        <Input placeholder="License Number"/>
      </Form.Item>
      <Form.Item name="notes">
        <Input.TextArea placeholder="Notes"/>
      </Form.Item>
      <Form.Item>
        <Button  type="primary" key="submit" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}