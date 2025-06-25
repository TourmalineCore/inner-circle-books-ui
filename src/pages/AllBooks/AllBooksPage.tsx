import { useMemo } from "react"
import { FilterAndSortingState } from "./sections/FilterAndSorting/state/FilterAndSortingState"
import { ActionState } from "./sections/Actions/state/ActionState"
import { BookCardsState } from "./sections/BookCards/state/BookCardsState"
import { FilterAndSortingStateContext } from "./sections/FilterAndSorting/state/FilterAndSortingStateContext"
import { ActionStateContext } from "./sections/Actions/state/ActionStateStateContext"
import { BookCardsStateContext } from "./sections/BookCards/state/BookCardsStateStateContext"
import { BookCardsContainer } from "./sections/BookCards/BookCardsContainer"

export function AllBooksPage() {
  const bookCardsState = useMemo(
    () => new BookCardsState(),
    [],
  )

  const actionState = useMemo(
    () => new ActionState(),
    [],
  )
  const filterAndSortingStateactionState = useMemo(
    () => new FilterAndSortingState(),
    [],
  )

  return (
    <div data-cy="books-page">
      <BookCardsStateContext.Provider value={bookCardsState}>
        <ActionStateContext.Provider value={actionState}>
          <FilterAndSortingStateContext.Provider value={filterAndSortingStateactionState}>
            <BookCardsContainer />
          </FilterAndSortingStateContext.Provider>
        </ActionStateContext.Provider>
      </BookCardsStateContext.Provider>
    </div>
  )
}
