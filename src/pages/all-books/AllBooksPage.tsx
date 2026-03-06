import { useEffect, useMemo, useState } from "react"
import { AllBooksState } from "./state/AllBooksState"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import {AllBooksContainer } from "./AllBooksContainer"
import { useSearchParams } from "react-router-dom"
import { LINK_TO_BOOKS_SERVICE } from "../../common/constant"
import { ModalQrFormContainer } from "../book/sections/modal-qr-form/ModalQrFormContainer"
import { ModalQrFormStateContext } from "../book/sections/modal-qr-form/state/ModalQrFormStateContext"
import { ModalQrFormState } from "../book/sections/modal-qr-form/state/ModalQrFormState"

export function AllBooksPage() {
  const allBooksState = useMemo(
    () => new AllBooksState(),
    [],
  )

  const modalQrFormState = useMemo(
    () => new ModalQrFormState(),
    [],
  )
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams()

  const addedBookId = searchParams.get(`addedBookId`)

  const [
    showModalQRForm,
    setShowModalQRForm,
  ] = useState(() => {
    if (addedBookId){
      return true
    }
    return false
  })

  // We need to clear the id of the added book from url, to see only books list after page refresh without QR modal. 
  // QR modal should be rendered only once after adding and redirecting to books list page
  useEffect(() => {
    if(addedBookId) {
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
        <ModalQrFormStateContext.Provider value={modalQrFormState}>
          <AllBooksContainer />
          {showModalQRForm && (
            <ModalQrFormContainer 
              bookId={addedBookId!}
              onCloseModal={() => setShowModalQRForm(false)}
            />
          )}
        </ModalQrFormStateContext.Provider>
      </AllBooksStateContext.Provider>
    </div>
  )
}
