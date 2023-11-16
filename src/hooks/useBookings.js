import { useState, useEffect } from 'react';
import { BookingsAPI } from 'src/api/BookingsAPI';

export const useBookings = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, toggleLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBookings = () => {
    toggleLoading(true)
    BookingsAPI.get().then((res) => {
      setRecords(res.message)
      toggleLoading(false)
    })
  }

  useEffect(() => getBookings, [])

  return { records, isLoading, error, getBookings }
}