import React, { useState } from 'react'
import { Space, Flex, Spin } from 'antd'
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import { useSettings } from 'src/hooks/useSettings'
import { Properties } from './Properties'

export const Settings = () => {
  const { settings, isLoading, dataLoaded, error, refetchSettings } = useSettings()
  const [toastNotification, setToastNotification] = useState({ message: null, type: null})

  return (
    <FeatureWrapper
      subHeaderProps={{
        feature: "Settings", 
        recordCount: 0,
        newRecordBtn: false,
      }}
      toastNotification={toastNotification}>
      <Flex 
        justify="center" 
        style={{ 
          background: '#f5f5f5',
          height: '100%' 
        }}>
        { dataLoaded ? (
        <Space 
          direction="vertical" 
          size="middle" 
          style={{ 
            maxWidth: '600px', 
            display: 'flex', 
            marginTop: '64px' 
          }}>
          <Properties settings={settings} />
        </Space>) : <Spin /> }
      </Flex>
    </FeatureWrapper>
  )
}