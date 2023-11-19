import React, { useEffect, useState } from 'react'
import { Card, Space, Flex, Typography } from 'antd'
const { Title, Paragraph, Text, Link } = Typography;
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import { Descriptions, Divider } from 'antd'
import { useSettings } from 'src/hooks/useSettings'

export const Settings = () => {
  const { settings, isLoading, dataLoaded, error, refetchSettings } = useSettings();
  const [toastNotification, setToastNotification] = useState({ message: null, type: null});

  return (
    <FeatureWrapper
      subHeaderProps={{
        feature: "Settings", 
        recordCount: 0,
        newRecordBtn: false,
      }}
      toastNotification={toastNotification}>
      <Flex justify="center" style={{ background: '#f5f5f5', height: '100%' }}>
        <Space direction="vertical" size="middle" style={{ maxWidth: '600px', display: 'flex', marginTop: '64px' }}>
          <Card>
            <Title level={4} style={{marginTop: 0}}>Properties</Title>
            <Descriptions
            style={{ margin: '20px 0' }} 
            column={1}>
              <Descriptions.Item label="Room Rate">${settings?.properties?.roomRate}</Descriptions.Item>
              <Descriptions.Item label="Checkin Time">{settings?.properties?.checkinTime}</Descriptions.Item>
              <Descriptions.Item label="Checkout Time">{settings?.properties?.checkoutTime}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Space>
      </Flex>
    </FeatureWrapper>
  )
}