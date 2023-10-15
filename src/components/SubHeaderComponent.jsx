import React, { useState, useEffect } from 'react';
import { Row, Col, Flex, Steps, Modal, Space, Typography, Button, Checkbox, Form, Input } from 'antd';
import { PlusCircleOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;
import { depluralize } from "../utils/helper"

const headingStyle = {
  margin: 0,
  fontSize: '1.4rem',
};

export default function SubHeaderComponent(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if(props.formStatus === "completed") {
      setIsModalOpen(false);
    }
  },[props.formStatus]);

  return (
    <>
      <Flex 
        gap="middle" 
        justify="space-between" 
        align="center" 
      >
        <Title 
          level={2} 
          style={{textTransform: 'capitalize', margin: 0, fontSize: 20}}
        >
          <Space>
            {props.feature}
            {props.recordCount > 0 && <Text>({props.recordCount})</Text>}
          </Space>
        </Title>
        <Space align="center">
          <Input 
            addonBefore={<SearchOutlined />} 
            style={{verticalAlign: 'middle',marginTop: -2}} 
            placeholder="search" 
          />
          <Button
            type="primary"
            shape="round"
            icon={<PlusCircleOutlined />}
            size="medium"
            onClick={showModal}
            style={{textTransform: 'capitalize'}}
          >
            New {depluralize(props.feature)}
          </Button>
        </Space>
      </Flex>
      <Modal 
        title={`New ${depluralize(props.feature)}`} 
        open={isModalOpen} 
        footer={null}
      >
        {props.children}
      </Modal>
    </>
  );
}