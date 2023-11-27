import { useState, useEffect } from 'react'
import { Drawer, Descriptions, Button, Space, Dropdown } from 'antd'
import { MoreOutlined, DeleteOutlined, EditOutlined, LineOutlined } from '@ant-design/icons'
import { EditGuestForm } from "./EditGuestForm"
import { useGuest } from 'src/hooks/useGuestsQuery'
import { transformDataForDescription } from './utils/guestHelpers'

export const GuestDetail = (props) => {
  const { guestId, updateGuest, deleteGuest, formStatus, showDrawer, hideDrawer } = props
  const guest = useGuest(guestId)
  const [isEditing, setEditState] = useState(false)
  const [descriptionContent, setDescriptionContent] = useState(null)

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
      onClick: () => deleteGuest(guest._id)
    },
  ]
  
  const onClose = () => {
    setEditState(false);
    hideDrawer();
  };

  useEffect(() => { // loop over guest's raw data for content display
    if(guest)
      setDescriptionContent( transformDataForDescription(guest) )
  }, [guest]);

  useEffect(() => { // revert to read-only when form is updated
    if(formStatus.response)
      setEditState(false)
  }, [formStatus]);

  return (
    <Drawer 
      title="Guest Information" 
      placement="right" 
      open={showDrawer()}
      onClose={onClose} 
      getContainer={false}
      extra={
        <Space>
          { isEditing ? (
            <Button type="text" onClick={() => setEditState(false)}>
              <LineOutlined />
            </Button>
          ) : (
            <Dropdown menu={{ items: actionItems }} placement="bottomRight">
              <MoreOutlined />
            </Dropdown> 
          )}
        </Space>
      }>
      { isEditing ? 
        <EditGuestForm 
          formData={guest} 
          formSubmit={updateGuest} 
          formStatus={formStatus} />
        :
        <Descriptions 
          items={descriptionContent} 
          column={1} 
          layout="small" 
          contentStyle={{textAlign: 'left'}} />
      }
    </Drawer>
  )
}