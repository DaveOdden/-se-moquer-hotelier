import { useQuery, useQueryClient } from '@tanstack/react-query'
import { RoomsAPI } from '../api/RoomAPI'

export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: () => RoomsAPI.get().then((res) => res.message),
  });
}

// export const useRoom = () => {
//   return useQuery({
//     queryKey: ['room', ],
//     queryFn: () => RoomsAPI.get().then((res) => res.message),
//   });
// }


export const useRoom = (id) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(['rooms'])?.find((d) => d._id === id)
}

export const useOccupiedRooms = () => {
  return useQuery({
    queryKey: ['occupiedrooms'],
    queryFn: () => RoomsAPI.getCurrentlyOccupiedRooms().then((res) => res.message),
  });
}