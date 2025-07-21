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
    if (!addBookState.validate()) return

    const payload = {
      title: addBookState.book.title,
      annotation: addBookState.book.annotation,
      authors: addBookState.book.authors
        .filter(author => author.fullName.trim() !== ``),
      language: addBookState.book.language,
      bookCoverUrl: addBookState.book.bookCoverUrl,
    }

    await api.post(`/books`, payload)

    goToBooksList()
  }
})
