import { useMemo } from "react"
import { BookStateContext } from "./state/BookStateStateContext"
import { BookState } from "./state/BookState"
import { BookCopyContainer } from "./BookCopyContainer"

export function BookCopyPage() {
  const bookCopyState = useMemo(
    () => new BookState(),
    [],
  )

  return (
    <BookStateContext.Provider value={bookCopyState}>
      <BookCopyContainer />
    </BookStateContext.Provider>
  )
}
