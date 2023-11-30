import { useState } from 'react';
import { DatabaseOutlined, SettingOutlined, UserOutlined, ReadOutlined, PartitionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";

const items = [
  {
    label: 'Overview',
    key: 'overview',
    href: 'overview',
    icon: <PartitionOutlined />,
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
    label: 'Settings',
    key: 'settings',
    href: 'settings',
    icon: <SettingOutlined />,
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
  return (
    <Menu 
      className="min-w-menu" 
      onClick={onClick} 
      selectedKeys={[current]} 
      mode="horizontal" 
      items={items} />
  )
}