import { useMemo } from "react"
import { AddBookContainer } from "./AddBookContainer"
import { AddBookState } from "./state/AddBookState"
import { AddBookStateContext } from "./state/AddBookStateStateContext"
import { allBooksRoutes } from "../routes"

export function AddBookPage() {
  const addBookState = useMemo(
    () => new AddBookState(),
    [],
  )

  const goToBooksList = () => {
    window.location.href = allBooksRoutes[0].path
  }

  return (
    <AddBookStateContext.Provider value={addBookState}>
      <AddBookContainer goToBooksList={goToBooksList} />
    </AddBookStateContext.Provider>
  )
}
