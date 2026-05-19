import { observer } from "mobx-react-lite"
import { BooksList } from "./components/books-list/BooksList"
import { Actions } from "./components/actions/Actions"
import { Filter } from "./components/filter/Filter"
import { useContext } from "react"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"

export const AllBooksContent = observer(() => {
  const allBooksState = useContext(AllBooksStateContext)

  const {
    query,
    filteredBooks,
    knowledgeAreas,
    selectedAreasIds,
  } = allBooksState
   
  return (
    <>
      <Actions
        query={query}
        onQueryChange={(query) => allBooksState.setQuery(query)}
      />

      <Filter
        knowledgeAreas={knowledgeAreas}
        selectedAreasIds={selectedAreasIds}
        toggleKnowledgeArea={(knowledgeArea) => allBooksState.toggleKnowledgeArea(knowledgeArea)}
        resetFilters={() => allBooksState.resetFilters()}
        resetToPreviouslySelectedAreas={() => allBooksState.resetToPreviouslySelectedAreas()}
        applySelectedAreas={() => allBooksState.applySelectedAreas()}
      />

      <BooksList cards={filteredBooks} />
    </>
  )
})