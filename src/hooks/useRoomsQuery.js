import { useQuery } from '@tanstack/react-query'
import { RoomsAPI } from '../api/RoomAPI'

export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: () => RoomsAPI.get().then((res) => res.message),
  });
}

export const useOccupiedRooms = () => {
  return useQuery({
    queryKey: ['occupiedrooms'],
    queryFn: () =>  RoomsAPI.getCurrentlyOccupiedRooms().then((res) => res.message),
  });
}