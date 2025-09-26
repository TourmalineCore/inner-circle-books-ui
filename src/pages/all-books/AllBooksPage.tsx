import { useEffect, useMemo } from "react"
import { AllBooksState } from "./state/AllBooksState"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import {AllBooksContainer } from "./AllBooksContainer"
import { useSearchParams } from "react-router-dom"

export function AllBooksPage() {
  const allBooksState = useMemo(
    () => new AllBooksState(),
    [],
  )
  const [
    searchParams,
  ] = useSearchParams()

  // If the url has the c query parameter,
  // it means that the transition was made from a qr code
  // and we need to redirect the user to the page of a copy of the book.
  useEffect(() => {
    const copyId = searchParams.get(`c`)

    if (copyId) {
      window.location.href =`/books/copy/${copyId}`
    }
  }, [
    searchParams,
  ])

  return (
    <div data-cy="all-books-page">
      <AllBooksStateContext.Provider value={allBooksState}>
        <AllBooksContainer />
      </AllBooksStateContext.Provider>
    </div>
  )
}
