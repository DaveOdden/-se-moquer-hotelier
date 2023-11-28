import { Descriptions, Divider } from 'antd'
import { BookedCalendar } from './BookedCalendar'

export const BookingDetailContent = (props) => {
  const { data } = props
  return (
    <>
      <Descriptions 
        size="small"
        style={{
          textAlign: 'left',
          marginTop: '0', 
        }} 
        column={1}
        labelStyle={{
          width: '120px'
        }}>
        { !data?.paid && <Descriptions.Item label="Paid">Pending Payment</Descriptions.Item> }
        <Descriptions.Item label="Room">#{data?.room?.roomNum}</Descriptions.Item>
        <Descriptions.Item label="Guest Name">{data?.guest?.firstName} {data?.guest?.lastName}</Descriptions.Item>
        <Descriptions.Item label="Confirmation #">{data?._id}</Descriptions.Item>
      </Descriptions>
      <Divider style={{marginTop: '12px'}} />
      <BookedCalendar data={data} />
      <Divider />
      <Descriptions 
        size="small"
        style={{
          textAlign: 'left',
          marginTop: '0', 
        }} 
        column={1}
        labelStyle={{
          width: '120px'
        }}>
        <Descriptions.Item label="Duration of Stay">{data?.billing?.days} days</Descriptions.Item>
        <Descriptions.Item label="Check-in">{data?.checkinDate}</Descriptions.Item>
        <Descriptions.Item label="Check-out">{data?.checkoutDate}</Descriptions.Item>
        <Divider style={{marginTop: '-12px'}} />
      </Descriptions>
    </>
  )
}