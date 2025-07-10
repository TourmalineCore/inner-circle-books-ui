import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { BookContent } from "./BookContent"
import { BookStateContext } from "./state/BookStateStateContext"
import { api } from "../../common/api"

export const BookContainer = observer(() => {
  const bookState = useContext(BookStateContext)

  useEffect(() => {
    async function loadBookAsync() {
      const {
        data,
      } = await api.get<BookType>(`/books/${bookState.id}`)

      bookState.initialize({
        loadedBook: data,
      })
    }

    loadBookAsync()
  }, [])

  return (
    <BookContent />
  )
})
