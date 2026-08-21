import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { BookStateContext } from "./state/BookStateStateContext"
import { api } from "../../common/api"
import { useLocation, useSearchParams } from "react-router-dom"
import { BookCopyContent } from "./BookCopyContent"

export const BookCopyContainer = observer(() => {
  const bookCopyState = useContext(BookStateContext)
  const location = useLocation()
      
  const pathnameParts = location
    .pathname
    .split(`/`)

  const bookCopyId = pathnameParts[3]

  const [
    searchParams,
  ] = useSearchParams()
  
  const secretKey = searchParams.get(`s`)

  useEffect(() => {
    loadDataAsync()
  }, [
    bookCopyId,
  ])

  return (
    <BookCopyContent
      onTake={takeBookAsync}
      copyId={bookCopyId}
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
    } = await api.get<BookType>(`/copy/${bookCopyId}?secretKey=${secretKey}`)

    bookCopyState.initializeBook({
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

    bookCopyState.initializeFeedback({
      loadedFeedback: bookFeedback,
    })
  }

  async function takeBookAsync({
    bookCopyId,
    scheduledReturnDate,
  }: TakeBookType) {
    bookCopyState.setIsTriedToSubmit()

    try {
      await api.post<TakeBookType>(
        `/take`,
        {
          bookCopyId,
          scheduledReturnDate,
        },
      )
      
      await loadBookAsync() 
    }
    finally {
      bookCopyState.resetIsTriedToSubmit()
    }
  }
})
