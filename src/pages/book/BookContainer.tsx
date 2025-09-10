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
    loadBookAsync()
  }, [
    id,
  ])

  return (
    <BookContent onTake={takeBookAsync}/>
  )

  async function loadBookAsync() {
    const {
      data,
    } = await api.get<BookType>(`/books/${id}`)

    bookState.initialize({
      loadedBook: data,
    })
  }

  async function takeBookAsync({
    bookCopyId,
    sсheduledReturnDate,
  }: TakeBookType) {
    bookState.setIsTriedToSubmit()

    try {
      await api.post<TakeBookType>(
        `/books/take`,
        {
          bookCopyId,
          sсheduledReturnDate,
        },
      )

      await loadBookAsync()
    }
    finally {
      bookState.resetIsTriedToSubmit()
    }
  }
})
