import { useState } from "react"

export const useCalendar = () => {
  const [
    endCalendarDate,
    setEndCalendarDate,
  ] = useState<Date | null>(null)

  const onChangeCalendar = (dates: [Date, Date]) => {
    const [
      start,
      end,
    ] = dates

    if (end === null) {
      setEndCalendarDate(start)
    }
    else {
      setEndCalendarDate(end)
    }
  }

  return {
    endCalendarDate,
    onChangeCalendar, 
  }
}
