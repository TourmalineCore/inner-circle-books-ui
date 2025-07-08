import { createContext } from "react"
import { AllBooksState } from "./AllBooksState"

export const AllBooksStateContext = createContext<AllBooksState>(null as unknown as AllBooksState)
