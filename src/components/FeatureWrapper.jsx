import { useEffect } from 'react'
import { Layout, message } from 'antd'
const { Header, Content } = Layout
import SubHeaderComponent from 'src/components/SubHeaderComponent'

export const FeatureWrapper = (props) => {
  const { subHeaderProps, newRecordComponent, toastNotification } = props
  const [messageApi, contextHolder] = message.useMessage();
  const showMessage = () => toastNotification?.type ? messageApi[toastNotification.type](toastNotification.message) : undefined

  useEffect(() => showMessage(), [toastNotification]);

  return (
    <>
      {contextHolder}
      <Header className="bg-white h-16 text-slate-800 px-4">
        <SubHeaderComponent {...subHeaderProps}>
          {newRecordComponent}
        </SubHeaderComponent>
      </Header>
      <Content className="bg-white text-slate-800 h-content border-t border-slate-100">
        {props.children}
      </Content>
    </>
  )
}