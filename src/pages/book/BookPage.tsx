import { useMemo, useState } from "react"
import { BookContainer } from "./BookContainer"
import { BookStateContext } from "./state/BookStateStateContext"
import { BookState } from "./state/BookState"
import { HistoryContainer } from "./sections/history/HistoryContainer"
import { HistoryStateContext } from "./sections/history/state/HistoryStateContext"
import { HistoryState } from "./sections/history/state/HistoryState"

export function BookPage() {
  const bookState = useMemo(
    () => new BookState(),
    [],
  )

  const historyState = useMemo(
    () => new HistoryState(),
    [],
  )

  const [
    isHistoryOpen,
    setIsHistoryOpen,
  ] = useState(false)
  
  const toggleHistoryModal = () => {
    setIsHistoryOpen(!isHistoryOpen)
  }

  return (
    <HistoryStateContext.Provider value={historyState}>
      <BookStateContext.Provider value={bookState}>
        <BookContainer toggleHistoryModal={toggleHistoryModal} />
        {isHistoryOpen && <HistoryContainer />}
      </BookStateContext.Provider>
    </HistoryStateContext.Provider>
  )
}
