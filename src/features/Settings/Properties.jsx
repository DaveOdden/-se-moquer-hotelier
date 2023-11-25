import { Card, Typography, Spin, Flex, Space } from 'antd'
const { Title } = Typography;
import { Descriptions } from 'antd'

export const Properties = (props) => {
  const { settings } = props;

  return (
    <Card style={{width: '100%'}}>
      <Title level={4} style={{marginTop: 0}}>Properties</Title>
      <Space style={{ margin: '20px 0 0' }}>
        { settings.isLoading ? (
          <Flex justify="center" align="center">
            <Spin />
          </Flex>
        ) : (
          <Descriptions
            column={1}>
            <Descriptions.Item label="Room Rate">${settings.data.properties.roomRate}</Descriptions.Item>
            <Descriptions.Item label="Checkin Time">{settings.data.properties.checkinTime}</Descriptions.Item>
            <Descriptions.Item label="Checkout Time">{settings.data.properties.checkoutTime}</Descriptions.Item>
          </Descriptions>
        ) }
      </Space>
    </Card>
  )
}