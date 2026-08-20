import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { api } from "../../common/api"
import { useLocation } from "react-router-dom"
import { BookFeedbackStateContext } from "./state/BookFeedbackStateContext"
import { BookFeedbackContent } from "./BookFeedbackContent"

export const BookFeedbackContainer = observer(() => {
  const bookFeedbackState = useContext(BookFeedbackStateContext)

  const {
    bookFeedback,
    isValid,
  } = bookFeedbackState

  const {
    progressOfReading,
    rating,
    advantages,
    disadvantages,
  } = bookFeedback 

  const location = useLocation()
  const pathnameParts = location
    .pathname
    .split(`/`)
  
  const bookId = pathnameParts[2]
  
  useEffect(() => {
    loadBookAsync()
  }, [
    bookId,
  ])
  
  // const goToBookCopyPage = () => {
  //   window.location.href = `${bookCopyRoutes[0].path.replace(`:id`, copyId)}?s=${secretKey}`
  // }

  return (
    <div className="container">
      <BookFeedbackContent
        onSubmit={leaveBookFeedbackAsync} 
        goToBookCopyPage={() => {}}
      />
    </div>
  )

  async function loadBookAsync() {
    const {
      data,
    } = await api.get<BookType>(`/${bookId}`)

    bookFeedbackState.initializeBook({
      loadedBook: data,
    })
  }
  
  async function leaveBookFeedbackAsync() {
    bookFeedbackState.setIsSaving()
    bookFeedbackState.setIsTriedToSubmit()

    if (!isValid) {
      bookFeedbackState.resetIsSaving()
      return
    }
  
    try {
      await api.post(
        `${bookId}/feedback`,
        {
          progressOfReading: progressOfReading,
          rating: rating,
          advantages: advantages,
          disadvantages: disadvantages,
        },
      )

      // goToBookCopyPage()
    }
    finally {
      bookFeedbackState.resetIsSaving()
      bookFeedbackState.resetIsTriedToSubmit()
    }
  }
})
