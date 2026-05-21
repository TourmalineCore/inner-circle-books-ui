import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import { api } from "../../common/api"
import { AllBooksContent } from "./AllBooksContent"

export const AllBooksContainer = observer(() => {
  const allBooksState = useContext(AllBooksStateContext)

  useEffect(() => {
    loadBookCardsAsync()
    loadKnowledgeAreas()
  }, [])

  return (
    <AllBooksContent />
  )

  async function loadBookCardsAsync() {
    const {
      data: {
        books,
      },
    } = await api.get<{ 
        books: BookCardType[], 
      }>(``)

    allBooksState.initializeBooks({
      booksCards: books,
    })
  }

  async function loadKnowledgeAreas() {
    const {
      data: {
        knowledgeAreas,
      },
    } = await api.get<{ 
        knowledgeAreas: KnowledgeArea[], 
      }>(`/knowledge-areas`)

    allBooksState.initializeKnowledgeAreas({
      knowledgeAreas,
    })
  } 
})