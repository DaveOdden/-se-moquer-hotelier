import React, { useState, useEffect } from 'react'
import { Drawer, Descriptions, Button, Space, Dropdown, Divider, Calendar } from 'antd'
import { MoreOutlined, DeleteOutlined, EditOutlined, LineOutlined } from '@ant-design/icons'
import { BookingDetailContent } from 'src/features/Bookings/BookingsDetail/BookingDetailContent'

export const BookingDetail = (props) => {
  const { data, show, deleteBooking } = props
  const [isOpen, setOpenState] = useState(false)
  const [isEditing, setEditState] = useState(false)

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

  useEffect(() => {
    setOpenState(show)
  }, [show]);

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
        { !isEditing && <BookingDetailContent data={data} /> }
      </Drawer>
    </>
  )
}