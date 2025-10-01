import moment from "moment"

export function getStatus({
  dueReturnDate,
  currentDate = new Date(),
  actualReturnDate,
}: {
  dueReturnDate: string,
  currentDate?: Date,
  actualReturnDate?: string,
}) {
  if (actualReturnDate) {
    return `Returned`
  }

  const dueDate = moment(dueReturnDate, `DD.MM.YYYY`)
  const now = moment(currentDate)

  const diffInDays = now.diff(dueDate, `days`)

  if (diffInDays <= 0) {
    return `-`
  }

  const years = now.diff(dueDate, `years`)
  dueDate.add(years, `years`)

  const months = now.diff(dueDate, `months`)
  dueDate.add(months, `months`)

  const days = now.diff(dueDate, `days`)

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