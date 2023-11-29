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
        <Title>
          <ShopOutlined className="text-2xl pr-2" />
          <Text className="text-2xl">Un Moquer Hotelier</Text>
        </Title>
      </Flex>
      <Flex align="end">        
        <FeatureNav />
      </Flex>
    </Flex>
  );
}