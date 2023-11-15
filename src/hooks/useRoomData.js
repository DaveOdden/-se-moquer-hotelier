import { useState, useEffect } from 'react';
import { RoomsAPI } from '../api/RoomAPI'

export const useRoomsOccupied = () => {
  const [occupiedRooms, setOccupiedRooms] = useState([]);

  const getRoomsOccupied = () => {
    RoomsAPI.getCurrentlyOccupiedRooms().then((res) => {
      setOccupiedRooms(res.message)
    })
  }

  useEffect(() => getRoomsOccupied, [])

  return occupiedRooms

}