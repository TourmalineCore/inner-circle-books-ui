import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ReturnBookContent } from "./ReturnBookContent"
import { ReturnBookStateContext } from "./state/ReturnBookStateContext"
import { api } from "../../common/api"
import { useLocation, useSearchParams } from "react-router-dom"
import { bookCopyRoutes } from "../routes"

export const ReturnBookContainer = observer(() => {
  const returnBookState = useContext(ReturnBookStateContext)

  const {
    book,
    isValid,
  } = returnBookState

  const {
    title,
    coverUrl,
    progressOfReading,
    rating,
    advantages,
    disadvantages,
  } = book 

  const location = useLocation()
  const pathnameParts = location
    .pathname
    .split(`/`)
  const copyId = pathnameParts?.[4]

  const [
    searchParams,
  ] = useSearchParams()
    
  const secretKey = searchParams.get(`s`)
  
  useEffect(() => {
    loadBookAsync()
  }, [
    copyId,
  ])
  
  const goToBookCopyPage = () => {
    window.location.href = `${bookCopyRoutes[0].path.replace(`:id`, copyId)}?s=${secretKey}`
  }

  return (
    <div className="container">
      <ReturnBookContent 
        title={title}
        coverUrl={coverUrl}
        onSubmit={returnBookAsync} 
        goToBookCopyPage={goToBookCopyPage}
      />
    </div>
  )

  async function loadBookAsync() {
    const {
      data,
    } = await api.get<BookType>(`/copy/${copyId}?secretKey=${secretKey}`)
  
    returnBookState.initialize({
      loadedBook: data,
    })
  }
  
  async function returnBookAsync() {
    returnBookState.setIsSaving()
    returnBookState.setIsTriedToSubmit()

    if (!isValid) {
      returnBookState.resetIsSaving()
      return
    }
  
    try {
      await api.post<ReturnBookType>(
        `/return`,
        {
          bookCopyId: Number(copyId),
          progressOfReading: progressOfReading,
          rating: rating,
          advantages: advantages,
          disadvantages: disadvantages,
        },
      )

      goToBookCopyPage()
    }
    finally {
      returnBookState.resetIsSaving()
      returnBookState.resetIsTriedToSubmit()
    }
  }
})
