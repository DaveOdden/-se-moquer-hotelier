import React, { useEffect } from 'react'
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
  color: '#333',
  backgroundColor: '#fff',
  height: 'calc(100vh - 241px)',
};

export const FeatureWrapper = (props) => {
  const { subHeaderProps, newRecordComponent, toastNotification } = props
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
          {newRecordComponent}
        </SubHeaderComponent>
      </Header>
      <Content style={contentStyle}>
        {props.children}
      </Content>
    </>
  )
}