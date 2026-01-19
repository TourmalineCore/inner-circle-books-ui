import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { AddBookContent } from "./AddBookContent"
import { AddBookStateContext } from "./state/AddBookStateStateContext"
import { api } from "../../common/api"

export const AddBookContainer = observer(({
  goToBooksList, 
}: { 
  goToBooksList: () => unknown, 
}) => {
  const addBookState = useContext(AddBookStateContext)

  useEffect(() => {
    async function loadKnowledgeAreas() {
      const {
        data: {
          knowledgeAreas,
        },
      } = await api.get<{ 
        knowledgeAreas: KnowledgeArea[], 
      }>(`/knowledge-areas`)

      addBookState.setKnowledgeAreas({
        knowledgeAreas,
      })
    } 

    loadKnowledgeAreas()
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
