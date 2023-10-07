import React from 'react';
import FeatureNav from './FeatureNav'
import { Row, Col } from 'antd';
import { Divider, Typography, Button } from 'antd';
import { ShopOutlined, PlusCircleOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;

const headingStyle = {
  margin: 0,
  fontSize: '1.4rem',
};

export default function HeaderComponent() {
  return (
    <Row
      align="stretch"
      justify="start"
      style={{maxWidth: 1440, margin: '0 auto'}}
    >
      <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
        <Typography>
          <Title style={headingStyle}><ShopOutlined style={{paddingRight: '.7rem'}}/>Se Moquer Hotelier</Title>
        </Typography>
      </Col> 
      <Col span={18} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FeatureNav />
      </Col>
    </Row>
  );
}