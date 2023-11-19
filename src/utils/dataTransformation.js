import dayjs from 'dayjs';

export const writtenOutDate = (date) => {
  return dayjs(date).format('dddd - MMMM DD, YYYY')
}

export const writtenOutDateTime = (date) => {
  return dayjs(date).format('ddd, MMM D, YYYY h:mm A')
}