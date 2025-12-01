import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ModalQrFormStateContext } from "./state/ModalQrFormStateContext"
import { useLocation} from "react-router-dom"
import { ModalQRFormContent } from "./ModalQRFormContent"
import { api } from "../../../../common/api"

export const ModalQrFormContainer = observer(({
  onCloseModal,
}: {
  onCloseModal: () => unknown,
}) => {
  const modalQrFormState = useContext(ModalQrFormStateContext)
  const location = useLocation()
      
  const pathnameParts = location
    .pathname
    .split(`/`)

  const id = pathnameParts[2]

  useEffect(() => {
    loadModalQrFormDataAsync()
  }, [
    id,
  ])

  return (
    <ModalQRFormContent onCloseModal={onCloseModal}/>
  )

  async function loadModalQrFormDataAsync() {
    const {
      data,
    } = await api.get<ModalQrFormType>(`/copies/${id}`)

    modalQrFormState.initialize({
      loadedModalQRFormData: data,
    })
  }
})
