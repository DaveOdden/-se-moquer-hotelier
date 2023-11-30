import { useState, useEffect } from 'react'
import { Flex, Modal, Space, Typography, Button, Input } from 'antd'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { depluralize } from "../utils/helper"

export default function SubHeaderComponent(props) {
  const { featureName, recordCount, newRecordBtn, newRecordStatus, search } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true)
  const hideModal = () => setIsModalOpen(false)

  useEffect(() => {
    if(newRecordStatus && newRecordStatus.response)
      setIsModalOpen(false)
  },[newRecordStatus])

  return (
    <>
      <Flex 
        gap="middle" 
        justify="space-between" 
        align="center">
        <Title level={2} className="capitalize">
          {featureName}
          {recordCount > 0 && <Text data-testid="record-count" className="pl-2 align-text-bottom">({recordCount})</Text>}
        </Title>
        <Space align="center">
          <Input 
            addonBefore={<SearchOutlined />} 
            className="align-middle -mt-1"
            placeholder="search"
            onChange={(e) => search(e)} />
          { newRecordBtn &&
            <Button
              type="primary"
              shape="round"
              icon={<PlusCircleOutlined />}
              size="medium"
              onClick={showModal}
              className="capitalize"
              data-testid="action-button">
              New {depluralize(featureName)}
            </Button>
          }
        </Space>
      </Flex>
      <Modal 
        title={`New ${depluralize(featureName)}`} 
        open={isModalOpen} 
        footer={null}
        onCancel={hideModal}
        destroyOnClose={true}>
        {props.children}
      </Modal>
    </>
  );
}