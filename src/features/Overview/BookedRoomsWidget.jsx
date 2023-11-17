import React from 'react'
import { Statistic, Spin } from 'antd'
import { useOccupiedRooms } from 'src/hooks/useRooms'

export const BookedRoomsWidget = () => {
  const occupiedRooms = useOccupiedRooms();

  return occupiedRooms.length ? (
      <Statistic 
        title="Occupied Rooms" 
        value={occupiedRooms.length} 
        valueStyle={{fontSize: '3rem'}} />
    ) : (
      <Spin />
    )
}