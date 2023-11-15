import { Space, Form, DatePicker, TimePicker } from 'antd';

export const NewBookingDateSelection = (props) => {
  const { onCheckinDateSelection, onCheckoutDateSelection, setCheckinTime, setCheckoutTime } = props
  
  return (
    <>
      <Space>
        <Form.Item
          name="checkinDate"
          label="CheckIn Date"
          rules={[
            {
              required: true,
              message: 'Check-in date is required',
            },
          ]}
        >
          <DatePicker
            onChange={onCheckinDateSelection}
          />
        </Form.Item>
        <Form.Item 
          name="checkinTime" 
          label="Checkin Time"
          rules={[
            {
              required: true,
              message: 'Check-in time is required',
            },
          ]}
        >
          <TimePicker 
            use12Hours 
            minuteStep={15} 
            format="h:mm a"
            onSelect={(val) => setCheckinTime(val)}
          />
        </Form.Item>
      </Space>
      <Space>
        <Form.Item 
          name="checkoutDate" 
          label="Checkout Date"
          rules={[
            {
              required: true,
              message: 'Check-out date is required',
            },
          ]}
        >
          <DatePicker 
            onChange={onCheckoutDateSelection}
          />
        </Form.Item>
        <Form.Item 
          name="checkoutTime" 
          label="Checkout Time"
          rules={[
            {
              required: true,
              message: 'Check-out time is required',
            },
          ]}
        >
          <TimePicker 
            use12Hours 
            minuteStep={15} 
            format="h:mm a"
            onSelect={(val) => setCheckoutTime(val)}
          />
        </Form.Item>
      </Space> 
    </>
  )
}