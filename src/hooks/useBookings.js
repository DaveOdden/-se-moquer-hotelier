import { useState, useEffect } from 'react';
import { BookingsAPI } from 'src/api/BookingsAPI';

export const useBookings = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, toggleLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);

  const getBookings = () => {
    BookingsAPI.get().then((res) => {
      setRecords(res.message)
      setDataLoaded(true)
    })
  }

  useEffect(() => getBookings, [])

  return { records, isLoading, dataLoaded, error, getBookings }
}