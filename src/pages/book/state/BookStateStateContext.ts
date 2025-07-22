import { createContext } from "react"
import { BookState } from "./BookState"

export const BookStateContext = createContext<BookState>(null as unknown as BookState)
