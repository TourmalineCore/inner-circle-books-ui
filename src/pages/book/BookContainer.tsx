import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { BookContent } from "./BookContent"
import { BookStateContext } from "./state/BookStateStateContext"
import { api } from "../../common/api"
import { useLocation} from "react-router-dom"

export const BookContainer = observer(() => {
  const bookState = useContext(BookStateContext)
  const location = useLocation()
  const pathnameParts = location
    .pathname
    .split(`/`)
  const id = pathnameParts[2]

  useEffect(() => {
    async function loadBookAsync() {
      const {
        data,
      } = await api.get<BookType>(`/books/${id}`)

      bookState.initialize({
        loadedBook: data,
        mockBookCopies: [
          {
            bookCopyId: 11,
          },
          {
            bookCopyId: 12,
          },
          {
            bookCopyId: 13,
          },
          {
            bookCopyId: 14,
          },
          {
            bookCopyId: 15,
          },
        ],
      })
    }

    loadBookAsync()
  }, [
    id,
  ])

  return (
    <BookContent />
  )
})
