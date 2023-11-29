import FeatureNav from './FeatureNav'
import { Flex } from 'antd'
import { Typography } from 'antd'
import { ShopOutlined } from '@ant-design/icons'
const { Title, Text } = Typography

export default function HeaderComponent() {
  return (
    <Flex
      align="stretch"
      justify="space-between">
      <Flex align="center">
        <Title level={1}>
          <ShopOutlined className="pr-2" />
          Un Moquer Hotelier
        </Title>
      </Flex>
      <Flex align="end">        
        <FeatureNav />
      </Flex>
    </Flex>
  );
}