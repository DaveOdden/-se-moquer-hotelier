import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { FeatureWrapper } from 'src/components/FeatureWrapper'
import { GuestAPI } from 'src/api/GuestAPI'
import NewGuestForm from './NewGuestForm';
import GuestDetail from './GuestDetail';

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [contentIsLoading, setLoadingState] = useState(true);
  const [newGuestFormStatus, setNewGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [editGuestFormStatus, setEditGuestFormStatus] = useState({ loading: false, response: null, error: null, pristine: true});
  const [showGuestDetail, setShowGuestDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [toastNotification, setToastNotification] = useState({ message: null, type: null});

  const columnDefinitions = [
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      width: '200px',
      key: 'lastName',
      paddingLeft: '50px',
      filteredValue: [searchValue],
      onFilter: (value, record) => {
        return (
          String(record.firstName).toLowerCase().includes(value.toLowerCase()) || 
          String(record.lastName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.address.street).toLowerCase().includes(value.toLowerCase()) ||
          String(record.address.city).toLowerCase().includes(value.toLowerCase()) ||
          String(record.address.state).toLowerCase().includes(value.toLowerCase()) ||
          String(record.address.zip).toLowerCase().includes(value.toLowerCase()) ||
          String(record.licenseNum).toLowerCase().includes(value.toLowerCase()) ||
          String(record.status).toLowerCase().includes(value.toLowerCase())
        )
      }
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '200px',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      width: '170px'
    },
    {
      title: 'Street Name',
      dataIndex: ['address', 'street'],
      key: 'street',
      width: '230px',
    },
    {
      title: 'City',
      dataIndex: ['address', 'city'],
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: ['address', 'state'],
      key: 'state',
      width: '70px'
    },
    {
      title: 'ZipCode',
      dataIndex: ['address', 'zip'],
      key: 'zip',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

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
      history: [],
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
        setToastNotification({
          message: 'Success. Guest Added',
          type: 'success'
        })
      } else {
        setNewGuestFormStatus({
          loading: false, 
          response: null, 
          error: true, 
          pristine: false
        })
        setToastNotification({
          message: 'Error. Something screwed up...',
          type: 'error'
        })
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
        setToastNotification({
          message: 'Success. Guest updated',
          type: 'success'
        })
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
        setToastNotification({
          message: 'Error. Something screwed up...',
          type: 'error'
        })
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
      setTableData(res.message);
      setLoadingState(false);
    })
  }

  const showDetail = (record) => {
    setShowGuestDetail(true)
    setSelectedRecord(record)
  }

  const hideDetail = () => {
    setShowGuestDetail(false)
    setSelectedRecord(null)
  }

  const searchTable = (e) => {
    const currentSearch = e.target.value;
    setSearchValue(currentSearch);
  }

  useEffect(() => getGuestData, []);
  useEffect(() => getGuestData, [newGuestFormStatus, editGuestFormStatus]);

  return (
    <FeatureWrapper
      subHeaderProps={{
        feature: "Guests", 
        recordCount: guests.length,
        newRecordBtn: true,
        formStatus: newGuestFormStatus,
        search: searchTable
      }}
      modalComponent={<NewGuestForm submitFn={createGuest} />}
      toastNotification={toastNotification}>
        <Table 
          dataSource={tableData} 
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
          }} />
        <GuestDetail 
          show={showGuestDetail} 
          data={selectedRecord} 
          onClose={hideDetail}
          updateGuest={updateGuest} 
          deleteGuest={deleteGuest} 
          editGuestFormStatus={editGuestFormStatus} />
    </FeatureWrapper>
  )
}