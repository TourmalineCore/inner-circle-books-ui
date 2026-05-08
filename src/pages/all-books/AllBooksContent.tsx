import { observer } from 'mobx-react-lite'
import { BooksList } from './components/books-list/BooksList'
import { Actions } from './components/actions/Actions'
import { Filter } from './components/filter/Filter'

export const AllBooksContent = observer(({
  cards,
  query,
  onQueryChange,
  knowledgeAreas,
  selectedAreas,
  onToggleArea,
  onResetFilters,
}: {
  cards: BookCardType[],
  query: string,
  onQueryChange: (value: string) => void,
  knowledgeAreas: string[],
  selectedAreas: Set<string>,
  onToggleArea: (area: string) => void,
  onResetFilters: () => void,
}) => {
  return (
    <>
      <Actions
        query={query}
        onQueryChange={onQueryChange}
      />

      <Filter
        knowledgeAreas={knowledgeAreas}
        selectedAreas={selectedAreas}
        onToggleArea={onToggleArea}
        resetFilters={onResetFilters}
      />

      <BooksList cards={cards} />
    </>
  )
})