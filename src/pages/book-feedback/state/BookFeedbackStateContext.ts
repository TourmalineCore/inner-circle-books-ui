import { createContext } from "react"
import { BookFeedbackState } from "./BookFeedbackState"

export const BookFeedbackStateContext = createContext<BookFeedbackState>(null as unknown as BookFeedbackState)