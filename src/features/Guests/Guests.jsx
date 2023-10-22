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
  const [newGuestFormStatus, setNewGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [editGuestFormStatus, setEditGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [showGuestDetail, setShowGuestDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const createGuest = (formData) => {
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

    setNewGuestFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })

    GuestAPI.post(preppedFormData).then((res) => {
      if(res.success) {
        setLoadingState(false);
        setNewGuestFormStatus({
          loading: false, 
          response: true, 
          error: null, 
          pristine: false
        })
        messageApi.success('Success. Guest Added');
      } else {
        setNewGuestFormStatus({
          loading: false, 
          response: null, 
          error: true, 
          pristine: false
        })
        messageApi.error('Error. Something screwed up...');
      }
    })
  }

  const updateGuest = (id, formData) => {
    let preppedFormData = {
      ...formData,
      lastUpdated: new Date(),
    };

    setEditGuestFormStatus({
      loading: true, 
      response: null, 
      error: null, 
      pristine: false
    })

    GuestAPI.update(id, preppedFormData).then((res) => {
      if(res.success) {
        messageApi.success('Success. Guest updated');
        setTimeout( () => {
          setEditGuestFormStatus({
            loading: false, 
            response: true, 
            error: null, 
            pristine: false
          })
        }, 1200)
        setTimeout( hideDetail, 800)
      } else {
        messageApi.error('Error. Something screwed up...');
        setEditGuestFormStatus({
          loading: false, 
          response: null, 
          error: true, 
          pristine: false
        })
      }
    })
  }

  const deleteGuest = (id) => {
    GuestAPI.delete(id).then((res) => {
      if(res.success) {
        messageApi.success('Success. Guest deleted');
        setTimeout( () => {
          setEditGuestFormStatus({
            loading: false, 
            response: true, 
            error: null, 
            pristine: false
          })
        }, 1200)
        setTimeout( hideDetail, 800)
      } else {
        messageApi.error('Error. Something screwed up...');
        setEditGuestFormStatus({
          loading: null, 
          response: null, 
          error: true, 
          pristine: false
        })
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

  const hideDetail = () => {
    setShowGuestDetail(false)
    setSelectedRecord(null)
  }

  useEffect(() => getGuestData, []);
  useEffect(() => getGuestData, [newGuestFormStatus, editGuestFormStatus]);

  return (
    <>
      <Header style={headerStyle}>
        {contextHolder}
        <SubHeaderComponent 
          feature="guests" 
          recordCount={guests.length}
          formStatus={newGuestFormStatus}
        >
          <NewGuestForm submitFn={createGuest} />
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
        <GuestDetail 
          show={showGuestDetail} 
          data={selectedRecord} 
          onClose={hideDetail}
          updateGuest={updateGuest} 
          deleteGuest={deleteGuest} 
          editGuestFormStatus={editGuestFormStatus}
        />
      </Content>
    </>
  )
}