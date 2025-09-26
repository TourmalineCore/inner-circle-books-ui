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

  // Redirect from QR code (parameter 'c') to the book copy page.
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
