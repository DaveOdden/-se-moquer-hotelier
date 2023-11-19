import React, { useState, useEffect } from 'react';
import { Flex, Modal, Space, Typography, Button, Input } from 'antd';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;
import { depluralize } from "../utils/helper"

const headingStyle = {
  margin: 0,
  fontSize: '1.4rem',
};

export default function SubHeaderComponent(props) {
  const { feature, recordCount, formStatus, search } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if(formStatus && formStatus.response) {
      setIsModalOpen(false);
    }
  },[formStatus]);

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
            {feature}
            {recordCount > 0 && <Text data-testid="record-count">({recordCount})</Text>}
          </Space>
        </Title>
        <Space align="center">
          <Input 
            addonBefore={<SearchOutlined />} 
            style={{verticalAlign: 'middle',marginTop: -2}} 
            placeholder="search"
            onChange={(e) => search(e)}
          />
          { props.newRecordBtn ? (
            <Button
              type="primary"
              shape="round"
              icon={<PlusCircleOutlined />}
              size="medium"
              onClick={showModal}
              style={{textTransform: 'capitalize'}}
              data-testid="action-button"
            >
              New {depluralize(props.feature)}
            </Button>
          ) : null }
        </Space>
      </Flex>
      <Modal 
        title={`New ${depluralize(props.feature)}`} 
        open={isModalOpen} 
        footer={null}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        {props.children}
      </Modal>
    </>
  );
}