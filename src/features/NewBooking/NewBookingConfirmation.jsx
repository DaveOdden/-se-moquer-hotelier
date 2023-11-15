import dayjs from 'dayjs';
import { Space, Flex, Button, Descriptions, Divider, Statistic } from 'antd';

export default function bookingConfirmation(props) {
  const { selectedGuest, checkinDate, checkoutDate, durationOfStay, submitBooking, roomRate, carouselRef } = props;

  return (
    <>
      <Space direction="vertical">
        <Descriptions 
          size="small"
          style={{marginTop: '16px', display: 'flex', justifyContent: 'flex-end'}} 
          column={1}
        >
          <Descriptions.Item label="Guest Name">{selectedGuest.firstName}</Descriptions.Item>
          <Descriptions.Item label="License #">70001011</Descriptions.Item>
          <Descriptions.Item label="Check In">{dayjs(checkinDate).format('dddd - MMMM DD, YYYY')}</Descriptions.Item>
          <Descriptions.Item label="Check Out">{dayjs(checkoutDate).format('dddd - MMMM DD, YYYY')}</Descriptions.Item>
          <Descriptions.Item label="Payment">Mock Payment</Descriptions.Item>
        </Descriptions>
        <Divider style={{margin: 0}}/>
        <Flex justify="space-between">
        <Descriptions column={1}>
          <Descriptions.Item label="Rate">${roomRate} x {durationOfStay}</Descriptions.Item></Descriptions>
          <Statistic title="Total" style={{textAlign: 'right', marginBottom: '32px'}} value={`$${roomRate*durationOfStay}`} />
        </Flex>
      </Space>
      <Flex justify="space-between">
        <Button onClick={() => carouselRef.current.goTo(0)}>Back</Button>
        <Button type="primary" onClick={() => submitBooking()}>Confirm Booking</Button>
      </Flex>
    </>
  )
}