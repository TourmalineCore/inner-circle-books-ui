import { useMemo } from "react"
import { BookContainer } from "./BookContainer"
import { BookStateContext } from "./state/BookStateStateContext"
import { BookState } from "./state/BookState"

export function BookPage() {
  const bookState = useMemo(
    () => new BookState(),
    [],
  )

  return (
    <BookStateContext.Provider value={bookState}>
      <BookContainer />
    </BookStateContext.Provider>
  )
}
