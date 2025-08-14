import './CustomCalendar.scss'

import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import DatePicker from 'react-datepicker'
import { useMediaQuery } from 'react-responsive'

export const CustomCalendar = observer(() => {
  const [
    startDate,
  ] = useState(new Date())

  const [
    endDate,
    setEndDate,
  ] = useState(null)

  const onChange = (dates: any) => {
    const [
      start,
      end,
    ] = dates

    if (end === null) {
      setEndDate(start)
    }
    else {
      setEndDate(end)
    }
  }

  const isMobile = useMediaQuery({
    maxWidth: 767,
  })

  const isLastDayOfMonth = (date: Date) => {
    const nextDay = new Date(date)
    nextDay.setDate(date.getDate() + 1)
    return nextDay.getMonth() !== date.getMonth()
  }

  const dayClassName = (date: Date) => {
    const classes = []
    if (isLastDayOfMonth(date)) {
      classes.push(`last-day-of-month`)
    }
    return classes.join(` `)
  }
  
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      monthsShown={
        isMobile 
          ? 1 
          : 2
      }
      formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
      minDate={startDate}
      dayClassName={dayClassName}
    />
  )
})