import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ModalQRFormStateContext } from "./state/ModalQRFormStateContext"
import { ModalQRFormContent } from "./ModalQRFormContent"
import { api } from "../../../../common/api"

export const ModalQRFormContainer = observer(({
  bookId,
  onCloseModal,
}: {
  bookId: string,
  onCloseModal: () => unknown,
}) => {
  const modalQRFormState = useContext(ModalQRFormStateContext)

  useEffect(() => {
    loadModalQrFormDataAsync()
  }, [
    bookId,
  ])

  return (
    <ModalQRFormContent
      loadModalQrFormDataAsync={loadModalQrFormDataAsync}
      addBookCopyAsync={addBookCopyAsync} 
      onCloseModal={onCloseModal}
    />
  )

  async function loadModalQrFormDataAsync() {
    const {
      data,
    } = await api.get<ModalQrFormType>(`/copies/${bookId}`)

    modalQRFormState.initialize({
      loadedModalQRFormData: data,
    })
  }

  async function addBookCopyAsync() {
    modalQRFormState.setIsSaving()

    try {
      await api.post(`/${bookId}/add-copy`)
    } 
    finally {
      modalQRFormState.resetIsSaving() 
    }
  }
})
