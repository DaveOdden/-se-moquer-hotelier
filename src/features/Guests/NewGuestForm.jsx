export default function NewGuestForm(props) {
  return (
    <Form id="guestsForm" onFinish={props.submitFn}>
      <Form.Item name="firstName" label="First Name">
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
      <Form.Item name="age" label="Age">
        <Input placeholder="Age"/>
      </Form.Item>
      <Form.Item label="Street Address">
        <Input placeholder="Street Address"/>
      </Form.Item>

      <Space>
        <Form.Item label="City">
          <Input placeholder="City"/>
        </Form.Item>
        <Form.Item label="State">
          <Input placeholder="State"/>
        </Form.Item>
        <Form.Item label="Zip Code">
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