import { useContext } from "react"
import { observer } from "mobx-react-lite"
import { AddBookContent } from "./AddBookContent"
import { AddBookStateContext } from "./state/AddBookStateStateContext"
import { api } from "../../common/api"

export const AddBookContainer = observer(({
  goToBooksList, 
}: { 
  goToBooksList: () => void, 
}) => {
  const addBookState = useContext(AddBookStateContext)

  return (
    <AddBookContent 
      onSubmit={submitBookAsync}
      goToBooksList={goToBooksList}
    />
  )

  async function submitBookAsync() {
    addBookState.setIsSaving()
    addBookState.setIsTriedToSubmit()

    if (!addBookState.isValid) {
      addBookState.resetIsTriedToSubmit()
      return
    }

    try {
      await api.post(`/books`, 
        {
          title: addBookState.book.title.trim(),
          annotation: addBookState.book.annotation.trim(),
          authors: addBookState.book.authors
            .map(author => ({
              fullName: author.fullName.trim(),
            }))
            .filter(author => author.fullName !== ``),
          language: addBookState.book.language === `rus` 
            ? `ru` 
            : `en`,
          bookCoverUrl: addBookState.book.bookCoverUrl,
        },
      )

      goToBooksList()
    }
    finally {
      addBookState.setIsSaved()
      addBookState.resetIsTriedToSubmit()
    }
  }
})
