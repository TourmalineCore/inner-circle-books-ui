import { useMemo, useState } from "react"
import { BookContainer } from "./BookContainer"
import { BookStateContext } from "./state/BookStateStateContext"
import { BookState } from "./state/BookState"
import { ModalQrFormContainer } from "./sections/modal-qr-form/ModalQrFormContainer"
import { ModalQrFormStateContext } from "./sections/modal-qr-form/state/ModalQrFormStateContext"
import { ModalQrFormState } from "./sections/modal-qr-form/state/ModalQrFormState"

export function BookPage() {
  const bookState = useMemo(
    () => new BookState(),
    [],
  )

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
        {showModalQRForm && <ModalQrFormContainer 
          onCloseModal={() => setShowModalQRForm(false)}
        />}
      </ModalQrFormStateContext.Provider>
    </BookStateContext.Provider>
  )
}
