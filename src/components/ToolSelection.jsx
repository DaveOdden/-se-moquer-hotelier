import React, { useState } from 'react';
import { MailOutlined, SettingOutlined, UserOutlined, ReadOutlined, PartitionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from "react-router-dom";

const items = [
  {
    label: 'Timeline',
    key: 'timeline',
    href: 'timeline',
    icon: <PartitionOutlined />,
    disabled: true,
  },
  {
    label: 'Bookings',
    key: 'bookings',
    href: 'bookings',
    icon: <ReadOutlined />,
  },
  {
    label: 'Guests',
    key: 'guests',
    href: 'guests',
    icon: <UserOutlined />,
  },
  {
    label: 'Email',
    key: 'mail',
    href: 'mail',
    icon: <MailOutlined />,
    disabled: true,
  },
  {
    label: 'Help',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    disabled: true,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  }
];


export default function ToolSelection() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState('bookings');
  const onClick = (e) => {
    console.log('click ', e);
    navigate(`/${e.key}`);
    setCurrent(e.key);
  };
  return <Menu style={{minWidth: '510px'}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}