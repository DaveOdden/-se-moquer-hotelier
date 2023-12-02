import { Form, Button } from 'antd'

export const EditRoomSubmit = props => {
  const { form, invalid, submitForm } = props
  const { room } = form.getFieldsValue();
  const formIsComplete = !!room;

  return (
    <Form.Item 
      className="mb-0">
      <Button 
        type="primary" 
        key="submit" 
        htmlType="submit" 
        onClick={submitForm}
        disabled={invalid || !formIsComplete}>
        Update Room
      </Button>
    </Form.Item>  
  )
}