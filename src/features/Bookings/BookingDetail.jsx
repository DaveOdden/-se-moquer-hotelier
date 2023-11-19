import React, { useState, useEffect } from 'react'
import { Drawer, Descriptions, Button, Space, Dropdown, Divider, Calendar } from 'antd'
import { MoreOutlined, DeleteOutlined, EditOutlined, LineOutlined } from '@ant-design/icons'
import { getArrayOfDatesBooked, findDatesToDisable } from 'src/utils/dateHelpers'

export const BookingDetail = (props) => {
  const { data, show, deleteBooking } = props
  const [isOpen, setOpenState] = useState(false)
  const [isEditing, setEditState] = useState(false)
  const [datesBooked, setDatesBooked] = useState(null)

  const actionItems = [
    {
      key: 'edit',
      label: (
        <Space size="large">
          Edit
        </Space>
      ),
      icon: (
        <EditOutlined />
      ),
      onClick: () => setEditState(true)
    },
    {
      key: 'delete',
      label: (
        <Space size="large">
          Delete
        </Space>
      ),
      icon: (
        <DeleteOutlined />
      ),
      danger: true,
      onClick: () => deleteBooking(data._id)
    },
  ]
  
  const onClose = () => {
    setOpenState(false);
    setEditState(false);
    props.onClose();
  };

  const init = () => {
    if(data) {
      let bookedDates = getArrayOfDatesBooked(data.checkinDate, data.checkoutDate)
      setDatesBooked(bookedDates)
    }
  }

  const disableCalendarDates = (current) => {
    return findDatesToDisable(datesBooked, current)
  }

  const otherBookedDates = []; // Replace with room's booked dates

  const isOtherBooking = (currentDate) => {
    const formattedDate = currentDate.format('YYYY-MM-DD');
    return otherBookedDates.includes(formattedDate);
  }

  const thisBooking = (currentDate) => {
    const formattedDate = currentDate.format('YYYY-MM-DD');
    return datesBooked.includes(formattedDate);
  }

  const borderRadiusForSeries = (currentDate) => {
    let tomorrow = currentDate.add(1, 'day').format('YYYY-MM-DD');
    let yesterday = currentDate.subtract(1, 'day').format('YYYY-MM-DD');

    if(!datesBooked.includes(yesterday)) {
      return '10px 0 0 10px'
    }

    if(!datesBooked.includes(tomorrow)) {
      return '0 10px 10px 0'
    }
    return 'none'
  }

  const dateCellRender = (currentDate) => {
    if (isOtherBooking(currentDate)) {
      return <div style={{background: '#eee'}}>{currentDate.date()}</div>;
    }
    if (thisBooking(currentDate)) {
      return <div style={{background: '#1677ff', color: 'white', borderRadius: borderRadiusForSeries(currentDate)}}>{currentDate.date()}</div>;
    }
    return currentDate.date();
  }

  useEffect(() => {
    setOpenState(show)
  }, [show]);

  useEffect(() => init(), [data])

  return (
    <>
      <Drawer 
        title="Booking Information" 
        placement="right" 
        open={isOpen}
        onClose={onClose} 
        getContainer={false}
        extra={
          <Space>
            { !isEditing && (
              <Dropdown 
                menu={{ items: actionItems }} 
                placement="bottomRight">
                <MoreOutlined />
              </Dropdown> 
            ) }
            { isEditing && (
              <Button 
                type="text" 
                onClick={() => setEditState(false)}>
                <LineOutlined />
              </Button>
            ) }
          </Space>
        }>
        { !isEditing && 
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
              <Descriptions.Item label="Room">#{data?.room?._id}</Descriptions.Item>
              <Descriptions.Item label="Guest Name">{data?.guest?.firstName} {data?.guest?.lastName}</Descriptions.Item>
              <Descriptions.Item label="Confirmation #">{data?._id}</Descriptions.Item>
            </Descriptions>
            <Divider style={{marginTop: '12px'}} />
            <Calendar 
              mode="month" 
              fullscreen={false} 
              fullCellRender={dateCellRender}
              style={{marginTop: '-20px'}} />
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
        }
      </Drawer>
    </>
  )
}