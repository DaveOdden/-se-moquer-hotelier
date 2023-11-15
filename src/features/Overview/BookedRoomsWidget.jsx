import React from 'react'
import { Statistic, Spin } from 'antd'
import { useRoomsOccupied } from '../../hooks/useRoomData'

export const BookedRoomsWidget = () => {
  const occupiedRooms = useRoomsOccupied();

  return occupiedRooms.length ? (
      <Statistic 
        title="Rooms Booked" 
        value={occupiedRooms.length} 
        valueStyle={{fontSize: '3rem'}}
      />
    ) : (
      <Spin />
    )
}