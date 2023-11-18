import { useState, useEffect } from 'react';
import { useGuestData } from 'src/hooks/useGuests'
import { useBookings } from 'src/hooks/useBookings'
import { useRooms } from 'src/hooks/useRooms'
import { writtenOutDateTime } from 'src/utils/dataTransformation'

export const useAggregatedBookings = () => {
  const guests = useGuestData();
  const bookings = useBookings();
  const rooms = useRooms();

  const [records, setRecords] = useState([]);
  const [isLoading, toggleLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const refetchBookings = () => bookings.refetchRecords()

  const findRoomsRecord = (_rooms, roomId) => {
    let selectedRecord = []
    if(_rooms.hasOwnProperty('records')) {
      for(let x = 0; x < _rooms.records.length; x++) {
        if(roomId === _rooms.records[x]._id) {
          selectedRecord = _rooms.records[x]
          break
        }
      }
      return selectedRecord;
    }
  }

  const findGuestRecord = (_guests, guestId) => {
    let selectedRecord = []
    if(_guests.hasOwnProperty('records')) {
      for(let y = 0; y < _guests.records.length; y++) {
        if(guestId === _guests.records[y]._id) {
          _guests.records[y].fullName = guests.records[y].firstName + ' ' + guests.records[y].lastName
          selectedRecord = _guests.records[y]
          break
        }
      }
    }
    return selectedRecord;
  }

  const getAdditionalDataForEachBooking = (_bookings, _guests, _rooms) => {
    for(let z = 0; z < _bookings.records.length; z++) {
      let guestId = _bookings.records[z].guest._id
      let roomId = _bookings.records[z].room._id
      let guestData = findGuestRecord(_guests, guestId)
      let roomData = findRoomsRecord(_rooms, roomId)
      bookings.records[z].guest = guestData
      bookings.records[z].room = roomData
      bookings.records[z].checkinDateReadable = writtenOutDateTime( bookings.records[z].checkinDate )
      bookings.records[z].checkoutDateReadable = writtenOutDateTime( bookings.records[z].checkoutDate )
    }
    return bookings.records
  }

  const aggregateData = () => {
    if(bookings.dataLoaded && guests.dataLoaded && rooms.dataLoaded) {
      toggleLoading(true)
      setRecords( getAdditionalDataForEachBooking( bookings, guests, rooms ) )
      toggleLoading(false)
    }
  }

  useEffect(() => aggregateData(), [bookings.dataLoaded, guests.dataLoaded, rooms.dataLoaded])

  return { records, isLoading, error, refetchBookings }
}