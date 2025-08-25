import { useMemo } from "react"
import { BookContainer } from "./BookContainer"
import { BookStateContext } from "./state/BookStateStateContext"
import { BookState } from "./state/BookState"
import { bookRoutes } from "../routes"

export function BookPage() {
  const bookState = useMemo(
    () => new BookState(),
    [],
  )

  const goToBookPage = () => {
    window.location.href = bookRoutes[0].path
  }

  return (
    <BookStateContext.Provider value={bookState}>
      <BookContainer goToBookPage={goToBookPage}/>
    </BookStateContext.Provider>
  )
}
