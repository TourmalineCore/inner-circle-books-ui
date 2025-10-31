import { createContext } from "react"
import { ModalQrFormState } from "./ModalQrFormState"

export const ModalQrFormStateContext = createContext<ModalQrFormState>(null as unknown as ModalQrFormState)
