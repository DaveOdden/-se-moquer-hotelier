import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { AppAPI } from 'src/api/API'
import { apiPaths } from 'src/api/constants'

export const useGuest = (id) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(['guests'])?.find((d) => d._id === id)
}

export const useGuests = () => {
  return useQuery({
    queryKey: ['guests'],
    queryFn: () => AppAPI.call({
      method: 'GET', 
      endpoint: apiPaths.guests
    }).then((res) => res.message),
  });
}

export const useGuestAutoComplete = () => {
  return useQuery({
    queryKey: ['guestsautocomplete'],
    queryFn: () => AppAPI.call({
      method: 'GET', 
      endpoint: apiPaths.autocompleteGuests
    }).then((res) => res.message),
  });
}

export const useCreateGuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newGuest) => {
      console.log(newGuest)
      return AppAPI.call({
        method: 'POST', 
        endpoint: apiPaths.guests,
        payload: newGuest
      })
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
      return AppAPI.call({
        method: 'PUT', 
        endpoint: apiPaths.guests,
        id: data.id,
        payload: data.payload
      })
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
      return AppAPI.call({
        method: 'DELETE', 
        endpoint: apiPaths.guests,
        id: id,
      })
    },
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries(["guests"]);
    },
  })
}