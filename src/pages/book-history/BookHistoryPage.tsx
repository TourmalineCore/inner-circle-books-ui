import { useMemo } from "react"
import { BookHistoryStateContext } from "./state/BookHistoryStateContext"
import { BookHistoryContainer } from "./BookHistoryContainer"
import { BookHistoryState } from "./state/BookHistoryState"

export function BookHistoryPage() {
  const bookHistoryState = useMemo(
    () => new BookHistoryState(),
    [],
  )

  return (
    <BookHistoryStateContext.Provider value={bookHistoryState}>
      <BookHistoryContainer />
    </BookHistoryStateContext.Provider>
  )
}
