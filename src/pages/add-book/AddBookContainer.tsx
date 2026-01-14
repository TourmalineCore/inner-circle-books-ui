import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { AddBookContent } from "./AddBookContent"
import { AddBookStateContext } from "./state/AddBookStateStateContext"
import { api } from "../../common/api"
import { AppStateContext } from "../../state/AppStateContext"

export const AddBookContainer = observer(({
  goToBooksList, 
}: { 
  goToBooksList: () => unknown, 
}) => {
  const addBookState = useContext(AddBookStateContext)
  const appState = useContext(AppStateContext)

  useEffect(() => {
    appState.fetchAndSetKnowledgeAreas()
  }, [])

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
      addBookState.resetIsSaving()
      return
    }
    
    const {
      title,
      annotation,
      countOfCopies,
      language,
      authors,
      knowledgeAreasIds,
      coverUrl,
    } = addBookState.book

    try {
      await api.post(``, 
        {
          title: title.trim(),
          annotation: annotation.trim(),
          language,
          authors: authors
            .map(author => ({
              fullName: author.fullName.trim(),
            }))
            .filter(author => author.fullName !== ``),
          coverUrl: coverUrl.trim(),
          knowledgeAreasIds,
          countOfCopies,
        },
      )

      goToBooksList()
    }
    finally {
      addBookState.resetIsSaving()
      addBookState.resetIsTriedToSubmit()
    }
  }
})
