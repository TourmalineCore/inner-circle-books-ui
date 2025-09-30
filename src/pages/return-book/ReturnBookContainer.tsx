import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ReturnBookContent } from "./ReturnBookContent"
import { ReturnBookStateContext } from "./state/ReturnBookStateContext"
import { api } from "../../common/api"
import { useLocation } from "react-router-dom"

export const ReturnBookContainer = observer(({
  goToBookCopyPage,
}: {
  goToBookCopyPage: ({
    copyId,
  }: {
    copyId: string,
  }) => unknown,
}) => {
  const returnBookState = useContext(ReturnBookStateContext)
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
  
      returnBookState.initialize({
        loadedBook: data,
      })
    }

    loadBookAsync()
  }, [
    id,
  ])

  return (
    <div className="container">
      <ReturnBookContent 
        onSubmit={returnBookAsync} 
        coverUrl={returnBookState.book.coverUrl}
        title={returnBookState.book.title}
        goToBookCopyPage={goToBookCopyPage}
      />
    </div>
  )
  
  async function returnBookAsync({
    bookCopyId,
    progressOfReading,
  }: ReturnBookType) {
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
          bookCopyId,
          progressOfReading,
        },
      )

      goToBookCopyPage({
        copyId: String(bookCopyId),
      })
    }
    finally {
      returnBookState.resetIsSaving()
      returnBookState.resetIsTriedToSubmit()
    }
  }
})
