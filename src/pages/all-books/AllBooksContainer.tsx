import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { AllBooksContent } from './AllBooksContent'
import { AllBooksStateContext } from './state/AllBooksStateStateContext'
import { api } from '../../common/api'

export const AllBooksContainer = observer(() => {
  const allBooksState = useContext(AllBooksStateContext)

  useEffect(() => {
    async function loadBookCardsAsync() {
      const {
        data: {
          books,
        },
      } = await api.get<{ 
        books: BookCardType[], 
      }>(``)

      allBooksState.initialize({
        booksCards: books,
      })
    }

    loadBookCardsAsync()
  }, [])

  return (
    <AllBooksContent
      cards={allBooksState.filteredBooks}
      query={allBooksState.query}
      onQueryChange={(query) => allBooksState.setQuery(query)}
      knowledgeAreas={allBooksState.knowledgeAreas}
      selectedAreas={allBooksState.selectedAreas}
      onToggleArea={(area) => allBooksState.onToggleArea(area)}
      onResetFilters={() => allBooksState.resetFilters()}
    />
  )
})