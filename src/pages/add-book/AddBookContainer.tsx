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

    const {
      title, annotation, authors,language, bookCoverUrl,
    } = addBookState.book

    await api.post(`/books`, {
      title,
      annotation,
      authors: authors.filter(author => author.fullName.trim() !== ``),
      language,
      bookCoverUrl,
    })

    goToBooksList()
  }
})
