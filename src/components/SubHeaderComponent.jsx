import React from 'react';
import { Row, Col } from 'antd';
import { Input, Space, Typography, Button } from 'antd';
import { ShopOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;

const headingStyle = {
  margin: 0,
  fontSize: '1.4rem',
};

export default function SubHeaderComponent() {
  return (
    <Row
      align="stretch"
      justify="start"
      style={{maxWidth: 1440, margin: '0 auto'}}
    >
      <Col span={3} offset={18}>
        <Space.Compact size="medium">
          <Input addonBefore={<SearchOutlined />} placeholder="search" />
        </Space.Compact>
      </Col>
      <Col span={3}>
        <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size="medium">
          New Booking
        </Button>
      </Col> 
    </Row>
  );
}