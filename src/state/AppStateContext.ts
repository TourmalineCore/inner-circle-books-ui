import { createContext } from "react"
import { AppState } from "./AppState"

export const AppStateContext = createContext<AppState>(null as unknown as AppState)
