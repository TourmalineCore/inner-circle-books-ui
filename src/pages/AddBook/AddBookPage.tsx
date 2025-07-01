import { useMemo } from "react"
import { AddBookContainer } from "./AddBookContainer"
import { AddBookState } from "./state/AddBookState"
import { AddBookStateContext } from "./state/AddBookStateStateContext"

export function AddBookPage() {
  const addBookState = useMemo(
    () => new AddBookState(),
    [],
  )

  return (
    <div data-cy="books-page">
      <AddBookStateContext.Provider value={addBookState}>
        <AddBookContainer/>
      </AddBookStateContext.Provider>
    </div>
  )
}
