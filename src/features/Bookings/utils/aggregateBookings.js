import { writtenOutDateTime } from 'src/utils/dataTransformation'

const findRoomsRecord = (_rooms, roomId) => {
  let selectedRecord = []
  for(let x = 0; x < _rooms.length; x++) {
    if(roomId === _rooms[x]._id) {
      selectedRecord = _rooms[x]
      break
    }
  }
  return selectedRecord;
}

const findGuestRecord = (_guests, guestId) => {
  let selectedRecord = []
  for(let y = 0; y < _guests.length; y++) {
    if(guestId === _guests[y]._id) {
      _guests[y].fullName = _guests[y].firstName + ' ' + _guests[y].lastName
      selectedRecord = _guests[y]
      break
    }
  }
  return selectedRecord;
}

export const getAdditionalDataForEachBooking = (guests, bookings, rooms) => {
  let aggregatedBookings = []
  if([guests, bookings, rooms].every(query => query.isSuccess)) {
    bookings.data.map(booking => {
      aggregatedBookings.push({
        ...booking,
        guest: findGuestRecord(guests.data, booking.guest._id),
        room: findRoomsRecord(rooms.data, booking.room._id),
        checkinDateReadable: writtenOutDateTime( booking.checkinDate ),
        checkoutDateReadable: writtenOutDateTime( booking.checkoutDate )
      })
    })
  }
  return aggregatedBookings
}