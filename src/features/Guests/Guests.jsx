import React, { useState, useEffect, Suspense } from 'react';
import { Table, Layout, message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SubHeaderComponent from '../../components/SubHeaderComponent'
import { GuestAPI } from '../../api/GuestAPI'
import { columnDefinitions } from './guestTableColumns';
import NewGuestForm from './NewGuestForm';

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  height: 64,
  paddingInline: 16,
  lineHeight: '64px',
  backgroundColor: '#fff',
  borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
};

const contentStyle = {
  textAlign: 'center',
  height: '80vh',
  color: '#333',
  backgroundColor: '#fff',
};

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
        setLoadingState(false);
        setFormStatus("completed")
        messageApi.success('Success. Guest Added');
      } else {
        setFormStatus("error")
        messageApi.error('Error. Something screwed up...');
      }
    })
  }

  const getGuestData = () => {
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
          <NewGuestForm submitFn={submitUser} />
        </SubHeaderComponent>
      </Header>
      <Content style={contentStyle}>
        <Suspense>
          <Table 
            dataSource={guests} 
            columns={columnDefinitions} 
            size="middle" 
            rowKey={(record) => record._id}
            loading={contentIsLoading}
            pagination="false"
          />
        </Suspense>
      </Content>
    </>
  )
}