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
  const copyId = pathnameParts?.[4]
  
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

  return (
    <div className="container">
      <ReturnBookContent 
        title={returnBookState.book.title}
        coverUrl={returnBookState.book.coverUrl}
        copyId={copyId}
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

      goToBookCopyPage({
        copyId: copyId,
      })
    }
    finally {
      returnBookState.resetIsSaving()
      returnBookState.resetIsTriedToSubmit()
    }
  }
})
