import { observer } from "mobx-react-lite"
import { BookHistoryContent } from "./BookHistoryContent"
import { api } from "../../common/api"
import { useLocation } from "react-router-dom"
import { useContext, useEffect } from "react"
import { BookHistoryStateContext } from "./state/BookHistoryStateContext"

export const BookHistoryContainer = observer(() => {
  const bookHistoryState = useContext(BookHistoryStateContext)

  const location = useLocation()
  const pathnameParts = location
    .pathname
    .split(`/`)
  const id = pathnameParts[3]

  useEffect(() => {
    loadBookHistoryAsync()
  }, [])

  return (
    <BookHistoryContent />
  )

  async function loadBookHistoryAsync() {
    const {
      data,
    } = await api.get<BookHistoryType[]>(`/books/history/${id}`)
 
    bookHistoryState.initialize({
      loadedBookHistory: data,
    })
  }
})
