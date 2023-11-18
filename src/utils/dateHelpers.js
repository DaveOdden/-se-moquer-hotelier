import dayjs from 'dayjs';

export const calculateDuration = (pastDate, futureDate) => {
  return dayjs(futureDate).diff(dayjs(pastDate), "days")
}