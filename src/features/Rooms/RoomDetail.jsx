import React, { useState, useEffect } from 'react'
import { Calendar } from 'antd'
import { RoomsAPI } from '../../api/RoomAPI'
import dayjs from 'dayjs'

export default function Rooms(props) {
  const [room, setRoom] = useState([]);
  
  const getRoomData = () => {
    RoomsAPI.get(props.room._id).then((res) => {
      setRoom(res.message)
    })
  }

  const findDatesToDisable = (current) => {
    if(room && room.datesBooked && room.datesBooked.length) {
      let index = room.datesBooked.findIndex(date => date === dayjs(current).format('YYYY-MM-DD'))
      return index > -1 && true
    }
  }
  
  useEffect(() => getRoomData, []);

  return (
    <>
      <h3>Room #{room.roomNum}</h3>
      { room && <Calendar mode="month" fullscreen={false} disabledDate={findDatesToDisable} /> }
    </>
  )
}