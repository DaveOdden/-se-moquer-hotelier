import { useQuery } from '@tanstack/react-query'
import { SettingsAPI } from '../api/SettingsAPI'

export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => SettingsAPI.get().then((res) => res.message),
  });
}