import React, { useState, useEffect } from 'react';
import { Table, Layout, message } from 'antd';
const { Header, Content } = Layout;
import SubHeaderComponent from '../../components/SubHeaderComponent'
import { GuestAPI } from '../../api/GuestAPI'
import { columnDefinitions } from './guestTableColumns';
import NewGuestForm from './NewGuestForm';
import GuestDetail from './GuestDetail';

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
  color: '#333',
  textAlign: 'center',
  backgroundColor: '#fff',
  height: 'calc(100vh - 194px)'
};

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [contentIsLoading, setLoadingState] = useState(true);
  const [formStatus, setFormStatus] = useState("empty");
  const [showGuestDetail, setShowGuestDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
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

  const showDetail = (record, recordIndex) => {
    setShowGuestDetail(true)
    setSelectedRecord(record)
  }

  const hideDetail = (select) => {
    setShowGuestDetail(false)
    setSelectedRecord(null)
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
        <Table 
          dataSource={guests} 
          columns={columnDefinitions} 
          size="middle" 
          rowKey={(record) => record._id}
          loading={contentIsLoading}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                showDetail(record, rowIndex)
              }
            };
          }}
          scroll={{
            y: 'calc(100vh - 241px)' // table header height, sub header height, header height, container margin
          }}
        />
        <GuestDetail show={showGuestDetail} data={selectedRecord} onClose={hideDetail} />
      </Content>
    </>
  )
}