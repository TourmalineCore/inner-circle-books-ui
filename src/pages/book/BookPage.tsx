import { useMemo } from "react"
import { BookContainer } from "./BookContainer"
import { AddBookState } from "./state/BookState"
import { AddBookStateContext } from "./state/BookStateStateContext"
import { allBooksRoutes } from "../routes"

export function BookPage() {
  const addBookState = useMemo(
    () => new AddBookState(),
    [],
  )

  const goToBooksList = () => {
    window.location.href = allBooksRoutes[0].path
  }

  return (
    <AddBookStateContext.Provider value={addBookState}>
      <BookContainer goToBooksList={goToBooksList} />
    </AddBookStateContext.Provider>
  )
}
