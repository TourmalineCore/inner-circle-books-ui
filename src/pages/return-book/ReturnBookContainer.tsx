import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ReturnBookContent } from "./ReturnBookContent"
import { ReturnBookStateContext } from "./state/ReturnBookStateStateContext"
import { api } from "../../common/api"
import { useLocation } from "react-router-dom"

export const ReturnBookContainer = observer(({
  goToBookPage,
}: {
  goToBookPage: () => unknown,
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
    <ReturnBookContent 
      onSubmit={returnBookAsync} 
      coverUrl={returnBookState.book.coverUrl}
      title={returnBookState.book.title}
    />
  )
  
  async function returnBookAsync({
    bookCopyId,
    progressOfReading,
  }: ReturnBookType) {
    returnBookState.setIsTriedToSubmit()
  
    try {
      await api.post<TakeBookType>(
        `/books/return`,
        {
          bookCopyId,
          progressOfReading,
        },
      )

      goToBookPage()
    }
    finally {
      returnBookState.resetIsTriedToSubmit()
    }
  }
})
