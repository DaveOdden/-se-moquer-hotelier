import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { GuestAPI } from '../api/GuestAPI'

export const useGuests = () => {
  return useQuery({
    queryKey: ['guests'],
    queryFn: () => GuestAPI.get().then((res) => res.message),
  });
}

export const useGuest = (id) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(['guests'])?.find((d) => d._id === id)
}

export const useGuestAutoComplete = () => {
  return useQuery({
    queryKey: ['guestsautocomplete'],
    queryFn: () => GuestAPI.getGuestsForAutocomplete().then((res) => res.message),
  });
}

export const useCreateGuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newGuest) => {
      return GuestAPI.post(newGuest)
    },
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries(["guests"]);
    },
  })
}

export const useUpdateGuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return GuestAPI.update(data.id, data.payload)
    },
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries(["guests"]);
    },
  })
}

export const useDeleteGuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      return GuestAPI.delete(id)
    },
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries(["guests"]);
    },
  })
}