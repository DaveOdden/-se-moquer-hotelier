import { useQueries } from '@tanstack/react-query'
import { GuestAPI } from '../api/GuestAPI'
import { BookingsAPI } from 'src/api/BookingsAPI'
import { RoomsAPI } from 'src/api/RoomAPI'

export const useAllFeatures = () => {
  return useQueries({
    queries: [
      { queryKey: ["guests"], queryFn: () => GuestAPI.get().then((res) => res.message) },
      { queryKey: ["bookings"], queryFn: () => BookingsAPI.get().then((res) => res.message) },
      { queryKey: ["rooms"], queryFn: () => RoomsAPI.get().then((res) => res.message) },
    ]
  })
}