import { createContext } from "react"
import { ReturnBookState } from "./ReturnBookState"

export const ReturnBookStateContext = createContext<ReturnBookState>(null as unknown as ReturnBookState)