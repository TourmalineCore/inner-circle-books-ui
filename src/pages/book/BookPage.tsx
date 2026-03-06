import { useMemo, useState } from "react"
import { BookContainer } from "./BookContainer"
import { BookStateContext } from "./state/BookStateStateContext"
import { BookState } from "./state/BookState"
import { ModalQrFormContainer } from "./sections/modal-qr-form/ModalQrFormContainer"
import { ModalQrFormStateContext } from "./sections/modal-qr-form/state/ModalQrFormStateContext"
import { ModalQrFormState } from "./sections/modal-qr-form/state/ModalQrFormState"
import { useLocation } from "react-router-dom"

export function BookPage() {
  const bookState = useMemo(
    () => new BookState(),
    [],
  )

  const location = useLocation()
        
  const pathnameParts = location
    .pathname
    .split(`/`)
  
  const bookId = pathnameParts[2]
    
  const modalQRFormState = useMemo(
    () => new ModalQrFormState(),
    [],
  )

  const [
    showModalQRForm,
    setShowModalQRForm,
  ] = useState(false)

  return (
    <BookStateContext.Provider value={bookState}>
      <ModalQrFormStateContext.Provider value={modalQRFormState}>
        <BookContainer
          openModalQrCode={() => setShowModalQRForm(true)}
        />
        {showModalQRForm && (
          <ModalQrFormContainer 
            bookId={bookId}
            onCloseModal={() => setShowModalQRForm(false)}
          />
        )}
      </ModalQrFormStateContext.Provider>
    </BookStateContext.Provider>
  )
}
