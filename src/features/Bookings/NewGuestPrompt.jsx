import React from 'react';
import { Flex, Button, Typography } from 'antd';
const { Text } = Typography;

export default function NewGuestPrompt(props) {
  return (
    <Flex align="center" justify="space-between">
      <Text style={{display: 'inline-block', fontSize: '.75rem'}}>
        <span style={{fontWeight: 'bold'}}>This guest is not in our system.</span>
        <div>Register this individual to start the booking process.</div>
      </Text>
      <Button type="primary" onClick={() => props.toggleNewGuestForm(true)}>
        Create New Guest
      </Button>
    </Flex>
  )
}