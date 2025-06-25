import { useContext, useEffect } from "react"

import { observer } from "mobx-react-lite"
import { BookCardsStateContext } from "./state/BookCardsStateStateContext"
import { api } from "../../../../common/api"
import { BookCardsContent } from "./BookCardsContent"

export const BookCardsContainer = observer(() => {
  const bookCardsState = useContext(BookCardsStateContext)

  useEffect(() => {
    async function loadBookCardsAsync() {
      const {
        data: {
          books,
        },
      } = await api.get<{ books: BookCardType[], }>(`/books`)

      bookCardsState.initialize({
        booksCards: books,
      })
    }

    loadBookCardsAsync()
  }, [])

  return (
    <BookCardsContent cards={bookCardsState.booksCards} />
  )
})