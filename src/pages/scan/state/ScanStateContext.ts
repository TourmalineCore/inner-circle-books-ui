import { createContext } from "react"
import { ScanState } from "./ScanState"

export const ScanStateContext = createContext<ScanState>(null as unknown as ScanState)
