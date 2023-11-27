import FeatureNav from './FeatureNav'
import { Row, Col } from 'antd'
import { Typography } from 'antd'
import { ShopOutlined } from '@ant-design/icons'
const { Title } = Typography

const headingStyle = {
  margin: 0,
  fontSize: '1.4rem',
};

export default function HeaderComponent() {
  return (
    <Row
      align="stretch"
      justify="start">
      <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
        <Typography>
          <Title style={headingStyle}><ShopOutlined style={{ paddingRight: '.7rem' }}/>Un Moquer Hotelier</Title>
        </Typography>
      </Col>
      <Col span={18} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FeatureNav />
      </Col>
    </Row>
  );
}