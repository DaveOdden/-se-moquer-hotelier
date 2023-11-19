import React, { useEffect, useState } from 'react'
import { Space } from 'antd'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import { Descriptions, Divider } from 'antd'
import { useSettings } from 'src/hooks/useSettings'

export const Settings = () => {
  const { settings, isLoading, dataLoaded, error, refetchSettings } = useSettings();
  const [toastNotification, setToastNotification] = useState({ message: null, type: null});

  useEffect(() => {
    console.log(settings)
  })

  return (
    <FeatureWrapper
      subHeaderProps={{
        feature: "Settings", 
        recordCount: 0,
        newRecordBtn: false,
      }}
      toastNotification={toastNotification}>
      <Space>
        <Descriptions
        size="small"
        style={{
          margin: '16px', 
          display: 'flex', 
          justifyContent: 'flex-end'
        }} 
        column={1}>
          <Descriptions.Item label="Room Rate">${settings?.properties?.roomRate}</Descriptions.Item>
          <Descriptions.Item label="Checkin Time">{settings?.properties?.checkinTime}</Descriptions.Item>
          <Descriptions.Item label="Checkout Time">{settings?.properties?.checkoutTime}</Descriptions.Item>
        </Descriptions>
      </Space>
    </FeatureWrapper>
  )
}