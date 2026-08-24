import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { BookContent } from "./BookContent"
import { BookStateContext } from "./state/BookStateStateContext"
import { api } from "../../common/api"
import { useLocation } from "react-router-dom"

export const BookContainer = observer(({
  openModalQrCode,
}: {
  openModalQrCode: () => unknown,
}) => {
  const bookState = useContext(BookStateContext)
  const location = useLocation()
      
  const pathnameParts = location
    .pathname
    .split(`/`)

  const bookId = pathnameParts[2]

  useEffect(() => {
    loadDataAsync()
  }, [
    bookId,
  ])

  return (
    <BookContent
      bookId={bookId} 
      openModalQrCode={openModalQrCode}
    />
  )

  async function loadDataAsync() {
    const bookId = await loadBookAsync()
    await loadFeedbackAsync({
      bookId,
    })
  }
  
  async function loadBookAsync() {
    const {
      data: loadedBook,
    } = await api.get<BookType>(`/${bookId}`)

    bookState.initializeBook({
      loadedBook,
    })
    return loadedBook.id
  }

  async function loadFeedbackAsync({
    bookId,
  }: {
    bookId: number,
  }) {
    const {
      data: {
        bookFeedback,
      },
    } = await api.get<FeedbackResponse>(`/feedback/${bookId}`)

    bookState.initializeFeedback({
      loadedFeedback: bookFeedback,
    })
  }
})
