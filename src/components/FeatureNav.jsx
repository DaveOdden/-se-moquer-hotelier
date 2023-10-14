import React, { useState } from 'react';
import { DatabaseOutlined, SettingOutlined, UserOutlined, ReadOutlined, PartitionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";

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
    label: 'Rooms',
    key: 'rooms',
    href: 'rooms',
    icon: <DatabaseOutlined />,
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


export default function FeatureNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.slice(1,location.pathname.length));
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };
  return <Menu style={{minWidth: '525px'}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}