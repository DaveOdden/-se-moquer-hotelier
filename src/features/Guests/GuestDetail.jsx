import React, { useState, useEffect } from 'react';
import { Drawer, Descriptions, Button, Space, Dropdown, message } from 'antd'
import { MoreOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function GuestDetail(props) {
  const [actionIsProcessing, setActionProcessingState] = useState(false);
  const [isOpen, setOpenState] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const editRecord = () => {
    setActionProcessingState(true)
    GuestAPI.update(data.props._id).then((res) => {
      console.log(res);
      if(res.success) {
        setActionProcessingState(false);
        messageApi.success('Success. Guest updated');
      } else {
        messageApi.error('Error. Something screwed up...');
      }
    })
  }

  const deleteRecord = () => {
    setActionProcessingState(true)
    GuestAPI.delete(data.props._id).then((res) => {
      console.log(res);
      if(res.success) {
        setActionProcessingState(false);
        messageApi.success('Success. Guest deleted');
      } else {
        messageApi.error('Error. Something screwed up...');
      }
    })
  }

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
      onClick: editRecord
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
      onClick: deleteRecord
    },
  ]
  
  const onClose = () => {
    setOpenState(false);
    props.onClose();
  };

  const transformDataForDescription = () => {
    let descriptionContent = [];
    if(props.data) {
      let index = 0;
      for(const key in props.data) {
        if(typeof props.data[key] != "object") {
          descriptionContent.push({
            key: index,
            label: key,
            children: props.data[key]
          })
          index++
        }
      }
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
      {contextHolder}
      <Drawer 
        title="Guest Information" 
        placement="right" 
        open={isOpen}
        onClose={onClose} 
        getContainer={false}
        extra={
          <Space>
            <Dropdown menu={{ items: actionItems }} placement="bottomRight">
              <MoreOutlined />
            </Dropdown>
          </Space>
        }
      >
        <Descriptions 
          items={descriptionContent} 
          column={1} 
          layout="small" 
          contentStyle={{textAlign: 'left'}}
        />
      </Drawer>
    </>
  )
}