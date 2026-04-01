import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { BookContent } from "./BookContent"
import { BookStateContext } from "./state/BookStateStateContext"
import { api } from "../../common/api"
import { useLocation, useSearchParams } from "react-router-dom"

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

  const id = pathnameParts[2]

  const isBookCopy = location.pathname.includes(`/copy`)
  const copyId = pathnameParts?.[3]

  const [
    searchParams,
  ] = useSearchParams()
  
  const secretKey = searchParams.get(`s`)

  useEffect(() => {
    loadDataAsync()
  }, [
    id,
    copyId,
  ])

  return (
    <BookContent
      bookId={id} 
      onTake={takeBookAsync}
      copyId={copyId}
      openModalQrCode={openModalQrCode}
    />
  )

  async function loadDataAsync() {
    const book = await loadBookAsync()
    await loadFeedbackAsync(book.id)
  }
  
  async function loadBookAsync() {
    const url = isBookCopy
      ? `/copy/${copyId}?secretKey=${secretKey}`
      : `/${id}`

    const {
      data,
    } = await api.get<BookType>(url)

    bookState.initializeBook({
      loadedBook: data,
    })
    return data
  }

  async function loadFeedbackAsync(bookId: number) {
    const url = `/feedback/${bookId}`
    const {
      data: {
        bookFeedbackList,
      },
    } = await api.get<FeedbackResponse>(url)

    bookState.initializeFeedback({
      loadedFeedback: bookFeedbackList,
    })
  }

  async function takeBookAsync({
    bookCopyId,
    scheduledReturnDate,
  }: TakeBookType) {
    bookState.setIsTriedToSubmit()

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
      bookState.resetIsTriedToSubmit()
    }
  }
})
