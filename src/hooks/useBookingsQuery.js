import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { BookingsAPI } from 'src/api/BookingsAPI';

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => BookingsAPI.get().then((res) => res.message),
  });
}

export const useBooking = (id) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(['bookings'])?.find((d) => d._id === id)
}

export const useArrayOfRoomsBooked = () => {
  return useQuery({
    queryKey: ['roomsbooked'],
    queryFn: () => BookingsAPI.get().then((res) => res.arrayOfRoomsBooked),
  });
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newBooking) => {
      return BookingsAPI.post(newBooking)
    },
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries(["bookings"]);
    },
  })
}

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      console.log(data)
      return BookingsAPI.update(data.id, data.payload)
    },
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries(["bookings"]);
    },
  })
}

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      return BookingsAPI.delete(id)
    },
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries(["bookings"]);
    },
  })
}