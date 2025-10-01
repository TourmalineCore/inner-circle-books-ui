import { createContext } from "react"
import { BookHistoryState } from "./BookHistoryState"

export const BookHistoryStateContext = createContext<BookHistoryState>(null as unknown as BookHistoryState)