import { createContext } from "react"
import { BookCardsState } from "./BookCardsState"

export const BookCardsStateContext = createContext<BookCardsState>(null as unknown as BookCardsState)
