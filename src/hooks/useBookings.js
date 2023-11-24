import { useState, useEffect, useMemo } from 'react';
import { BookingsAPI } from 'src/api/BookingsAPI';

export const useBookings = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, toggleLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const refetchRecords = () => getBookings()
  
  const getBookings = () => {
    try {
      toggleLoading(true)
      setDataLoaded(false)
      useMemo( BookingsAPI.get().then((res) => {
        setRecords(res.message)
        setDataLoaded(true)
      }))
    }
    catch(err){
      setError(err)
    }finally{
      toggleLoading(false)
    }
  }

  useEffect(() => getBookings, [])

  return { records, isLoading, dataLoaded, error, refetchRecords }
}