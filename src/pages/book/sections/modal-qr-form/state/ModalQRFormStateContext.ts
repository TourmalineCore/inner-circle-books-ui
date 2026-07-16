import { createContext } from "react"
import { ModalQRFormState } from "./ModalQRFormState"

export const ModalQRFormStateContext = createContext<ModalQRFormState>(null as unknown as ModalQRFormState)
