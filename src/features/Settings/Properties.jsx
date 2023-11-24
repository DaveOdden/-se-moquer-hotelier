import { Card, Typography } from 'antd'
const { Title } = Typography;
import { Descriptions } from 'antd'

export const Properties = (props) => {
  const { settings } = props;
  
  return (
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
  )
}