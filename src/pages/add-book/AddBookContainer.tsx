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

  const handleSubmit = async () => {

    addBookState.setIsSaving()
    try {
      await submitBookAsync()
    }
    finally {
      addBookState.setIsSaved()
    }
  }

  return (
    <AddBookContent 
      onSubmit={handleSubmit}
      goToBooksList={goToBooksList}
    />
  )

  async function submitBookAsync() {
    addBookState.setIsTriedToSubmit()

    if (!addBookState.isValid) return

    const payload = {
      title: addBookState.title,
      annotation: addBookState.annotation,
      authors: addBookState.authors
        .filter(author => author.fullName.trim() !== ``),
      language: addBookState.language === `rus` 
        ? `ru` 
        : `en`,
      bookCoverUrl: addBookState.bookCoverUrl,
    }

    await api.post(`/books`, payload)

    addBookState.resetIsTriedToSubmit()

    goToBooksList()
  }
})
