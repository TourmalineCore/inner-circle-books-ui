import { createContext } from "react"
import { HistoryState } from "./HistoryState"

export const HistoryStateContext = createContext<HistoryState>(null as unknown as HistoryState)