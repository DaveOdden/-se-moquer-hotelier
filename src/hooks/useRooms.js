import { useState, useEffect } from 'react';
import { RoomsAPI } from '../api/RoomAPI'

export const useOccupiedRooms = () => {
  const [occupiedRooms, setOccupiedRooms] = useState([]);

  const getRoomsOccupied = () => {
    RoomsAPI.getCurrentlyOccupiedRooms().then((res) => {
      setOccupiedRooms(res.message)
    })
  }

  useEffect(() => getRoomsOccupied, [])

  return occupiedRooms
}

export const useRooms = () => {
  const [records, setRecords] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);

  const getRooms = () => {
    RoomsAPI.get().then((res) => {
      setRecords(res.message)
      setDataLoaded(true)
    })
  }

  useEffect(() => getRooms, [])

  return { records, dataLoaded, error }
}