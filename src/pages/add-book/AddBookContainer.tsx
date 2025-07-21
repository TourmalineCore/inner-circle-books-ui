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

    const {
      title,
      annotation,
      language,
      authors,
      bookCoverUrl,
    } = addBookState.book

    if (!addBookState.isValid) {
      addBookState.resetIsTriedToSubmit()
      return
    }

    try {
      await api.post(`/books`, 
        {
          title: title.trim(),
          annotation: annotation.trim(),
          language,
          authors: authors
            .map(author => ({
              fullName: author.fullName.trim(),
            }))
            .filter(author => author.fullName !== ``),
          bookCoverUrl: bookCoverUrl.trim(),
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
