import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ModalQrFormStateContext } from "./state/ModalQrFormStateContext"
import { ModalQRFormContent } from "./ModalQRFormContent"
import { api } from "../../../../common/api"

export const ModalQrFormContainer = observer(({
  bookId,
  onCloseModal,
}: {
  bookId: string,
  onCloseModal: () => unknown,
}) => {
  const modalQrFormState = useContext(ModalQrFormStateContext)

  useEffect(() => {
    loadModalQrFormDataAsync()
  }, [
    bookId,
  ])

  return (
    <ModalQRFormContent onCloseModal={onCloseModal}/>
  )

  async function loadModalQrFormDataAsync() {
    const {
      data,
    } = await api.get<ModalQrFormType>(`/copies/${bookId}`)

    modalQrFormState.initialize({
      loadedModalQRFormData: data,
    })
  }
})
