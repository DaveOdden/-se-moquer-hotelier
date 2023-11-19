import React, { useState } from 'react';
import { Space, Form, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';

export const NewBookingDateSelection = (props) => {
  const { onCheckinDateSelection, onCheckoutDateSelection, setCheckinTime, setCheckoutTime } = props
  const [checkinDate, setCheckinDate] = useState()

  const disableDatesPriorToToday = (current) => {
    return current.isBefore(dayjs(new Date()).subtract(1, 'day')) ? true : false
  }
  
  const disableDatesPriorToCheckIn = (current) => {
    return current.isBefore(checkinDate) ? true : false
  }

  const onChangeOfDateSelection = (val) => {
    setCheckinDate(val)
    onCheckinDateSelection(val)
  }

  return (
    <>
      <Space>
        <Form.Item
          name="checkinDate"
          label="CheckIn Date"
          rules={[{
            required: true,
            message: 'Check-in date is required',
          }]}>
          <DatePicker 
            onChange={onChangeOfDateSelection} 
            disabledDate={disableDatesPriorToToday} />
        </Form.Item>
        <Form.Item 
          name="checkinTime" 
          label="Checkin Time"
          rules={[{
            required: true,
            message: 'Check-in time is required',
          }]}>
          <TimePicker 
            use12Hours 
            minuteStep={15} 
            format="h:mm a"
            onSelect={(val) => setCheckinTime(val)} />
        </Form.Item>
      </Space>
      <Space>
        <Form.Item 
          name="checkoutDate" 
          label="Checkout Date"
          rules={[{
            required: true,
            message: 'Check-out date is required',
          }]}>
          <DatePicker 
            onChange={onCheckoutDateSelection} 
            disabledDate={disableDatesPriorToCheckIn} />
        </Form.Item>
        <Form.Item 
          name="checkoutTime" 
          label="Checkout Time"
          rules={[{
            required: true,
            message: 'Check-out time is required',
          }]}>
          <TimePicker 
            use12Hours 
            minuteStep={15} 
            format="h:mm a"
            onSelect={(val) => setCheckoutTime(val)} />
        </Form.Item>
      </Space> 
    </>
  )
}