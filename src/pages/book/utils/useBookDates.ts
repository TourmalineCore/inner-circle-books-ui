export const useBookDates = () => {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() + 3)

  // formate date to DD.MM.YYYY format
  const day = String(currentDate.getDate())
    .padStart(2, `0`)
  const month = String(currentDate.getMonth() + 1)
    .padStart(2, `0`)
  const year = currentDate.getFullYear()

  return {
    formattedDate: `${day}.${month}.${year}`,
    isoDate: currentDate
      .toISOString()
      .slice(0, 10),
  }
}
