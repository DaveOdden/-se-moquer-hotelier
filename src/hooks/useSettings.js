import { useState, useEffect } from 'react';
import { SettingsAPI } from '../api/SettingsAPI'

export const useSettings = () => {
  const [settings, setSettings] = useState([]);
  const [isLoading, toggleLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const refetchSettings = () => getSettings()

  const getSettings = () => {
    try {
      toggleLoading(true)
      SettingsAPI.get().then((res) => {
        console.log(res);
        setSettings(res.message)
        setDataLoaded(true)
      })
    }
    catch(err) {
      setError(err)
    } finally {
      toggleLoading(false)
    }
  }

  useEffect(() => getSettings(), [])

  return { settings, isLoading, dataLoaded, error, refetchSettings }
}