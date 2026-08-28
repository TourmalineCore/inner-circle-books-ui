import { useEffect, useMemo, useState } from "react"
import { AllBooksState } from "./state/AllBooksState"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import {AllBooksContainer } from "./AllBooksContainer"
import { useSearchParams } from "react-router-dom"
import { LINK_TO_BOOKS_SERVICE } from "../../common/constant"
import { ModalQRFormContainer } from "../book/sections/modal-qr-form/ModalQRFormContainer"
import { ModalQRFormStateContext } from "../book/sections/modal-qr-form/state/ModalQRFormStateContext"
import { ModalQRFormState } from "../book/sections/modal-qr-form/state/ModalQRFormState"

export function AllBooksPage() {
  const allBooksState = useMemo(
    () => new AllBooksState(),
    [],
  )

  const modalQRFormState = useMemo(
    () => new ModalQRFormState(),
    [],
  )

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams()

  const [
    addedBookId,
    setAddedBookId,
  ] = useState<string | null>(null)

  const [
    showModalQRForm,
    setShowModalQRForm,
  ] = useState(false)

  // We need to clear the id of the added book from url, to see only books list after page refresh without QR modal. 
  // QR modal should be rendered only once after adding and redirecting to books list page
  useEffect(() => {    
    const addedBookIdFromQuery = searchParams.get(`addedBookId`)

    if (addedBookIdFromQuery) {
      setShowModalQRForm(true)
      setAddedBookId(addedBookIdFromQuery)

      searchParams.delete(`addedBookId`)
      setSearchParams(searchParams)
    }
  }, [])

  // Redirect from QR code (parameter 'c') to the book copy page with secretKey (parameter 's').
  useEffect(() => {
    const copyId = searchParams.get(`c`)
    if (!copyId) return

    const secretKey = searchParams.get(`s`)

    if (secretKey) {
      window.location.href = `${LINK_TO_BOOKS_SERVICE}/copy/${copyId}?s=${secretKey}`
    }
  }, [
    searchParams,
  ])

  return (
    <div data-cy="all-books-page">
      <AllBooksStateContext.Provider value={allBooksState}>
        <ModalQRFormStateContext.Provider value={modalQRFormState}>
          <AllBooksContainer />
          {showModalQRForm && (
            <ModalQRFormContainer 
              bookId={addedBookId!}
              onCloseModal={() => setShowModalQRForm(false)}
            />
          )}
        </ModalQRFormStateContext.Provider>
      </AllBooksStateContext.Provider>
    </div>
  )
}
