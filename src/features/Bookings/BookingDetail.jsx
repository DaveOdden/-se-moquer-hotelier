import React, { useState, useEffect } from 'react';
import { Drawer, Descriptions, Button, Space, Dropdown } from 'antd'
import { MoreOutlined, DeleteOutlined, EditOutlined, LineOutlined } from '@ant-design/icons';

export const BookingDetail = (props) => {
  const [isOpen, setOpenState] = useState(false);
  const [isEditing, setEditState] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState(null);
  const [editGuestFormStatus, setEditGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});

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
      onClick: () => props.deleteBooking(props.data._id)
    },
  ]
  
  const onClose = () => {
    setOpenState(false);
    setEditState(false);
    props.onClose();
  };

  const transformDataForDescription = () => {
    let descriptionContent = [];
    function loopOverProperties(dataObj) {
      let index = 0;
      for(const key in dataObj) {
        if(typeof dataObj[key] != "object") {
          descriptionContent.push({
            key: index,
            label: key,
            children: dataObj[key]
          })
          index++
        } else {
          loopOverProperties(dataObj[key])
        }
      }
    }
    if(props.data) {
      loopOverProperties(props.data)
      setDescriptionContent(descriptionContent);
    }
  }

  useEffect(() => {
    transformDataForDescription()
  }, [props.data]);

  useEffect(() => {
    setOpenState(props.show)
  }, [props.show]);

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
          <Descriptions 
            items={descriptionContent} 
            column={1} 
            layout="small" 
            contentStyle={{textAlign: 'left'}} />
        }
      </Drawer>
    </>
  )
}