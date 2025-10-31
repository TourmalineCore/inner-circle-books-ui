import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ReturnBookContent } from "./ReturnBookContent"
import { ReturnBookStateContext } from "./state/ReturnBookStateContext"
import { api } from "../../common/api"
import { useLocation, useSearchParams } from "react-router-dom"
import { bookCopyRoutes } from "../routes"

export const ReturnBookContainer = observer(() => {
  const returnBookState = useContext(ReturnBookStateContext)
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
    async function loadBookAsync() {
      const {
        data,
      } = await api.get<BookType>(`/books/copy/${copyId}`)
  
      returnBookState.initialize({
        loadedBook: data,
      })
    }

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
        title={returnBookState.book.title}
        coverUrl={returnBookState.book.coverUrl}
        onSubmit={returnBookAsync} 
        goToBookCopyPage={goToBookCopyPage}
      />
    </div>
  )
  
  async function returnBookAsync() {
    returnBookState.setIsSaving()
    returnBookState.setIsTriedToSubmit()

    if (!returnBookState.isValid) {
      returnBookState.resetIsSaving()
      return
    }
  
    try {
      await api.post<ReturnBookType>(
        `/books/return`,
        {
          bookCopyId: Number(copyId),
          progressOfReading: returnBookState.book.progressOfReading,
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
