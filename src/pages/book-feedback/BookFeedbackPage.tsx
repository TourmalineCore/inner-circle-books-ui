import { useMemo } from "react"
import { BookFeedbackState } from "./state/BookFeedbackState"
import { BookFeedbackStateContext } from "./state/BookFeedbackStateContext"
import { BookFeedbackContainer } from "./BookFeedbackContainer"

export function BookFeedbackPage() {
  const bookFeedbackState = useMemo(
    () => new BookFeedbackState(),
    [],
  )

  return (
    <BookFeedbackStateContext.Provider value={bookFeedbackState}>
      <BookFeedbackContainer />
    </BookFeedbackStateContext.Provider>
  )
}