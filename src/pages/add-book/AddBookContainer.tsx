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
    // check if I could press submit

    addBookState.setIsTriedToSubmit()

    if (!addBookState.isValid) {
      addBookState.resetIsTriedToSubmit()
      return // never get to reset
    }

    const payload = {
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
    }

    // try finally block
    // set is saving in progress and then reset it when it was complete (success or fail)
    await api.post(`/books`, payload)

    // shouldn't reset tried to submit after it was tried
    addBookState.resetIsTriedToSubmit()

    goToBooksList()
  }
})
