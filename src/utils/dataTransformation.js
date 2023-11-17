import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useGuestData } from 'src/hooks/useGuests'

export const writtenOutDate = (date) => {
  return dayjs(date).format('dddd - MMMM DD, YYYY')
}

export const writtenOutDateTime = (date) => {
  return dayjs(date).format('dddd - MMMM DD, YYYY H:M A')
}

export const getRoomRecordByBooking = () => {
  let room
  return room
}