import { useQuery } from '@tanstack/react-query'
import { GuestAPI } from '../api/GuestAPI';

export const useGuests = () => {
  return useQuery({
    queryKey: ['guests'],
    queryFn: () => GuestAPI.get().then((res) => res.message),
  });
}

export const useGuestAutoComplete = () => {
  return useQuery({
    queryKey: ['guestsautocomplete'],
    queryFn: () => GuestAPI.getGuestsForAutocomplete().then((res) => res.message),
  });
}