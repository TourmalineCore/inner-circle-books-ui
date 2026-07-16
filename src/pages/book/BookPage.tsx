import { useMemo, useState } from "react"
import { BookContainer } from "./BookContainer"
import { BookStateContext } from "./state/BookStateStateContext"
import { BookState } from "./state/BookState"
import { ModalQRFormContainer } from "./sections/modal-qr-form/ModalQRFormContainer"
import { ModalQRFormStateContext } from "./sections/modal-qr-form/state/ModalQrFormStateContext"
import { ModalQRFormState } from "./sections/modal-qr-form/state/ModalQRFormState"
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
    () => new ModalQRFormState(),
    [],
  )

  const [
    showModalQRForm,
    setShowModalQRForm,
  ] = useState(false)

  return (
    <BookStateContext.Provider value={bookState}>
      <ModalQRFormStateContext.Provider value={modalQRFormState}>
        <BookContainer
          openModalQrCode={() => setShowModalQRForm(true)}
        />
        {showModalQRForm && (
          <ModalQRFormContainer 
            bookId={bookId}
            onCloseModal={() => setShowModalQRForm(false)}
          />
        )}
      </ModalQRFormStateContext.Provider>
    </BookStateContext.Provider>
  )
}
