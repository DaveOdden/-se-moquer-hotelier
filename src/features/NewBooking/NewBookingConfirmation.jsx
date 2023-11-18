import React, { useEffect } from 'react';
import { Space, Flex, Button, Descriptions, Divider, Statistic } from 'antd'
import { writtenOutDate } from 'src/utils/dataTransformation'

export const BookingConfirmation = (props) => {
  const roomRate = 140
  const { 
    formData,
    guestDetails, 
    submitBooking, 
    backButtonAction 
  } = props

  return (
    <>
      <Space direction="vertical">
        <Descriptions 
          size="small"
          style={{
            marginTop: '16px', 
            display: 'flex', 
            justifyContent: 'flex-end'
          }} 
          column={1}>
          <Descriptions.Item label="Guest Name">{guestDetails?.firstName} {guestDetails?.lastName}</Descriptions.Item>
          <Descriptions.Item label="License #">{guestDetails?.licenseNum}</Descriptions.Item>
          <Descriptions.Item label="Check In">{writtenOutDate(formData?.checkinDate)}</Descriptions.Item>
          <Descriptions.Item label="Check Out">{writtenOutDate(formData?.checkoutDate)}</Descriptions.Item>
          <Descriptions.Item label="Payment">Mock Payment</Descriptions.Item>
        </Descriptions>
        <Divider style={{ margin: 0 }}/>
        <Flex justify="space-between">
          <Descriptions column={1}>
            <Descriptions.Item label="Rate">${roomRate} x {formData?.billing?.days}</Descriptions.Item>
          </Descriptions>
          <Statistic 
            title="Total" 
            style={{
              textAlign: 'right', 
              marginBottom: '32px'
            }} 
            value={`$${roomRate*formData?.billing?.days}`} />
        </Flex>
      </Space>
      <Flex justify="space-between">
        <Button onClick={backButtonAction}>Back</Button>
        <Button type="primary" onClick={() => submitBooking()}>Confirm Booking</Button>
      </Flex>
    </>
  )
}