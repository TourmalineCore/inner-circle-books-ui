import moment from "moment"

export function getStatus({
  scheduledReturnDate,
  currentDate = new Date(),
  actualReturnedDate,
}: {
  scheduledReturnDate: string,
  currentDate?: Date,
  actualReturnedDate?: string | null,
}) {
  if (actualReturnedDate) {
    return `Returned`
  }

  const returnDate = moment(scheduledReturnDate, `DD.MM.YYYY`)
  const now = moment(currentDate)

  const diffInDays = now.diff(returnDate, `days`)

  if (diffInDays <= 0) {
    return `-`
  }

  const years = now.diff(returnDate, `years`)
  returnDate.add(years, `years`)

  const months = now.diff(returnDate, `months`)
  returnDate.add(months, `months`)

  const days = now.diff(returnDate, `days`)

  const parts = []

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? `year` : `years`}`)
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? `month` : `months`}`)
  }

  if (days > 0) {
    parts.push(`${months > 0 ? `and ${days}` : `${days}`} ${days === 1 ? `day` : `days`}`)
  }

  return `${parts.join(` `)} overdue`
}