import { useState, useEffect } from 'react'
import { Calendar } from 'antd'
import { getArrayOfDatesBooked } from 'src/utils/dateHelpers'

export const BookedCalendar = (props) => {
  const { data } = props
  const [datesBooked, setDatesBooked] = useState(null)

  const init = () => {
    if(data) {
      let bookedDates = getArrayOfDatesBooked(data.checkinDate, data.checkoutDate)
      setDatesBooked(bookedDates)
    }
  }

  const otherBookedDates = []; // Replace with room's booked dates

  const isOtherBooking = (currentDate) => {
    const formattedDate = currentDate.format('YYYY-MM-DD');
    return otherBookedDates?.includes(formattedDate);
  }

  const thisBooking = (currentDate) => {
    const formattedDate = currentDate.format('YYYY-MM-DD');
    return datesBooked?.includes(formattedDate);
  }

  const borderRadiusForSeries = (currentDate) => {
    let tomorrow = currentDate.add(1, 'day').format('YYYY-MM-DD');
    let yesterday = currentDate.subtract(1, 'day').format('YYYY-MM-DD');

    if(!datesBooked.includes(yesterday)) {
      return '10px 0 0 10px'
    }

    if(!datesBooked.includes(tomorrow)) {
      return '0 10px 10px 0'
    }
    return 'none'
  }

  const dateCellRender = (currentDate) => {
    if(data) {
      if (isOtherBooking(currentDate)) {
        return <div className="bg-zinc-100">{currentDate.date()}</div>;
      }
      if (thisBooking(currentDate)) {
        return <div style={{background: '#1677ff', color: 'white', borderRadius: borderRadiusForSeries(currentDate)}}>{currentDate.date()}</div>;
      }
    }
    return currentDate.date();
  }

  useEffect(() => init(), [data])

  return (
    <Calendar 
      mode="month" 
      fullscreen={false} 
      fullCellRender={dateCellRender}
      className="-mt-5" />
  )
}