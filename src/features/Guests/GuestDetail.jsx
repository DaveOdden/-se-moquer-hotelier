import React, { useState, useEffect } from 'react';
import { Drawer, Descriptions } from 'antd'

export default function GuestDetail(props) {
  const [isOpen, setOpenState] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState(null);
  
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
    <Drawer 
      title="Guest Information" 
      placement="right" 
      open={isOpen} 
      onClose={onClose} 
      getContainer={false}
    >
      <Descriptions 
        items={descriptionContent} 
        column={1} 
        layout="small" 
        contentStyle={{textAlign: 'left'}}
      />
    </Drawer>
  )
}