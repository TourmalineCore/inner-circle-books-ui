import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { api } from "../../common/api"
import { useLocation } from "react-router-dom"
import { BookFeedbackStateContext } from "./state/BookFeedbackStateContext"
import { BookFeedbackContent } from "./BookFeedbackContent"
import { isSafeReturnUrl } from "../../common/utils/isSafeReturnUrl/isSafeReturnUrl"
import { allBooksRoutes } from "../routes"

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

  const getSafeReturnUrl = ({
    returnUrl,
  }: {
    returnUrl: string | null,
  }) => {
    if (!returnUrl) {
      return allBooksRoutes[0].path
    }

    const safeReturnUrl = isSafeReturnUrl({
      returnUrl,
    }) 
      ? returnUrl
      : allBooksRoutes[0].path

    return safeReturnUrl
  }
  
  const goToPreviousPage = () => {
    const returnUrl = sessionStorage.getItem(`bookFeedbackReturnUrl`)

    const safeReturnUrl = getSafeReturnUrl({
      returnUrl,
    })

    window.location.href = safeReturnUrl
  }

  return (
    <div className="container">
      <BookFeedbackContent
        onSubmit={leaveBookFeedbackAsync} 
        goToPreviousPage={goToPreviousPage}
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

      goToPreviousPage()
    }
    finally {
      bookFeedbackState.resetIsSaving()
      bookFeedbackState.resetIsTriedToSubmit()
    }
  }
})  