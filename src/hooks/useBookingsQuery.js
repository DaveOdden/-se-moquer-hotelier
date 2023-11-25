import { useQuery } from '@tanstack/react-query'
import { BookingsAPI } from 'src/api/BookingsAPI';

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => BookingsAPI.get().then((res) => res.message),
  });
}