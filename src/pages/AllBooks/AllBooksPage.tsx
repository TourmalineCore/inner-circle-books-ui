import { useMemo } from "react"
import { BookCardsState } from "./sections/BookCards/state/BookCardsState"
import { BookCardsStateContext } from "./sections/BookCards/state/BookCardsStateStateContext"
import { BookCardsContainer } from "./sections/BookCards/BookCardsContainer"

export function AllBooksPage() {
  const bookCardsState = useMemo(
    () => new BookCardsState(),
    [],
  )

  return (
    <div data-cy="all-books-page">
      <BookCardsStateContext.Provider value={bookCardsState}>
        <BookCardsContainer />
      </BookCardsStateContext.Provider>
    </div>
  )
}
