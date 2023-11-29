import { useState, useEffect } from 'react'
import { Drawer, Button, Space, Dropdown } from 'antd'
import { MoreOutlined, DeleteOutlined, EditOutlined, LineOutlined } from '@ant-design/icons'
import { BookingDetailContent } from 'src/features/Bookings/BookingsDetail/BookingDetailContent'
import { EditBookingForm } from 'src/features/Bookings/BookingsDetail/EditBookingForm'
import { useBooking } from 'src/hooks/useBookingsQuery'
import { getAdditionalDataForEachBooking } from '../utils/aggregateBookings'

export const BookingDetail = (props) => {
  const { bookingId, fullBookingDetails, updateBooking, deleteBooking, formStatus, showDrawer, hideDrawer } = props
  const booking = useBooking(bookingId)
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
    setEditState(false);
    hideDrawer();
  };

  return (
    <Drawer 
      title="Booking Information" 
      placement="right" 
      open={showDrawer()}
      onClose={onClose} 
      getContainer={false}
      extra={
        <Space>
          { isEditing ? (
            <Button 
              type="text" 
              onClick={() => setEditState(false)}>
              <LineOutlined />
            </Button>
          ) : (
            <Dropdown 
              menu={{ items: actionItems }} 
              placement="bottomRight">
              <MoreOutlined />
            </Dropdown>   
          ) }
        </Space>
      }>
      { isEditing ?
        <EditBookingForm 
          formData={fullBookingDetails} 
          formStatus={formStatus}
          formSubmit={updateBooking} />
        :
        <BookingDetailContent data={fullBookingDetails} /> 
      }
    </Drawer>
  )
}