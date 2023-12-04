export const apiUrl = 'https://un-moquer-hotelier-api.vercel.app/api';
export const apiKey = import.meta.env.VITE_VERCEL_API_KEY
export const apiPaths = {
  bookings: "/bookings",
  bookingsByRoom: "/bookingsByRoom",
  guests: "/guests",
  autocompleteGuests: "/getGuestsForAutocomplete",
  rooms: "/rooms",
  occupiedRooms: "/getCurrentlyOccupiedRooms",
  roomByAvailability: "/getRoomsByAvailability",
  settings: "/settings",
}