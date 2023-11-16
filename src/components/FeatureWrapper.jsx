import React, { useState, useEffect } from 'react'
import { Layout, message } from 'antd'
const { Header, Content } = Layout
import SubHeaderComponent from 'src/components/SubHeaderComponent'

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  height: 64,
  paddingInline: 16,
  lineHeight: '64px',
  backgroundColor: '#fff',
  borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
};

const contentStyle = {
  textAlign: 'center',
  height: 'calc(100vh - 128px)',
  color: '#333',
  backgroundColor: '#fff',
};

export const FeatureWrapper = (props) => {
  const { subHeaderProps, modalComponent, toastNotification } = props
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = () => {
    toastNotification.type ? messageApi[toastNotification.type](toastNotification.message) : null
  }

  useEffect(() => showMessage(), [toastNotification]);

  return (
    <>
      {contextHolder}
      <Header style={headerStyle}>
        <SubHeaderComponent {...subHeaderProps}>
          {modalComponent}
        </SubHeaderComponent>
      </Header>
      <Content style={contentStyle}>
        {props.children}
      </Content>
    </>
  )
}