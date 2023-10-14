import React, { useState, useEffect } from 'react';
import { Table, Layout, Space, Form, Input, Button, message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SubHeaderComponent from '../components/SubHeaderComponent'
import { GuestAPI } from '../api/GuestAPI'

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff',
  borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
};

const contentStyle = {
  textAlign: 'center',
  height: 'calc(100vh - 128px)',
  color: '#333',
  backgroundColor: '#fff',
};

const columns = [
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    width: '200px',
    key: 'lastName',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '200px',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Street Name',
    dataIndex: 'street',
    key: 'street',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [contentIsLoading, setLoadingState] = useState(true);
  const [formStatus, setFormStatus] = useState("empty");
  const [messageApi, contextHolder] = message.useMessage();

  const submitUser = (formData) => {
    console.log(formData);
    setLoadingState(true);
    let preppedFormData = {
      ...formData,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip
      },
      currentlyAssignedRoom: "",
      status: "good",
      storedCreditCard: {},
      history: {},
      signUpDate: new Date(),
    };
    delete preppedFormData.street
    delete preppedFormData.city
    delete preppedFormData.state
    delete preppedFormData.zip

    GuestAPI.post(preppedFormData).then((res) => {
      console.log(res);
      if(res.success) {
        //setGuests(res.message);
        setLoadingState(false);
        setFormStatus("completed")
        messageApi.success('Success. Guest Added');
      } else {
        setFormStatus("error")
        messageApi.error('Error. Something screwed up...');
      }
    })
  }

  function getGuestData() {
    GuestAPI.get().then((res) => {
      setGuests(res.message);
      setLoadingState(false);
    })
  }

  useEffect(() => getGuestData, []);
  useEffect(() => getGuestData, [formStatus]);

  return (
    <>
      <Header style={headerStyle}>
        {contextHolder}
        <SubHeaderComponent 
          feature="guests" 
          recordCount={guests.length}
          formStatus={formStatus}
        >
          <Form id="guestsForm" onFinish={submitUser}>
            <Form.Item name="firstName" label="First Name">
              <Input placeholder="e.g. John"/>
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input placeholder="Last Name"/>
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input placeholder="Email"/>
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input placeholder="Phone"/>
            </Form.Item>
            <Form.Item name="age" label="Age">
              <Input placeholder="Age"/>
            </Form.Item>
            <Form.Item label="Street Address">
              <Input placeholder="Street Address"/>
            </Form.Item>

            <Space>
              <Form.Item label="City">
                <Input placeholder="City"/>
              </Form.Item>
              <Form.Item label="State">
                <Input placeholder="State"/>
              </Form.Item>
              <Form.Item label="Zip Code">
                <Input placeholder="Zip Code"/>
              </Form.Item>
            </Space>

            <Form.Item name="licenseNumber">
              <Input placeholder="License Number"/>
            </Form.Item>
            <Form.Item name="notes">
              <Input.TextArea placeholder="Notes"/>
            </Form.Item>
            <Form.Item>
              <Button  type="primary" key="submit" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </SubHeaderComponent>
      </Header>
      <Content style={contentStyle}>
        { guests
          && 
          <Table 
            dataSource={guests} 
            columns={columns} 
            size="middle" 
            rowKey={(record) => record._id}
            loading={contentIsLoading}
          />
        }
      </Content>
    </>
  )
}