import dayjs from 'dayjs';

export const calculateDuration = (pastDate, futureDate) => {
  return dayjs(futureDate).diff(dayjs(pastDate), "days")
}

export const getArrayOfDatesBooked = (pastDate, futureDate) => {
  const startDate = dayjs(pastDate)
  const endDate = dayjs(futureDate)
  let countOfDays = endDate.diff(startDate, 'day', true)

  let arrayOfDatesStaying = []
  for(let x = 0; x <= countOfDays; x++) {
    if(x === 0) {
      arrayOfDatesStaying.push(startDate.format('YYYY-MM-DD'))
    } else {
      arrayOfDatesStaying.push(startDate.add(x, 'day').format('YYYY-MM-DD'))
    }
  }

  return arrayOfDatesStaying
}

export const findDatesToDisable = (poolOfDates, passedDate) => {
  let incomingDate = dayjs(passedDate).format('YYYY-MM-DD')
  return poolOfDates.includes(incomingDate)
}