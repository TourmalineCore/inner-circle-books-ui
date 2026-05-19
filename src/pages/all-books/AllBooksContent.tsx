import { observer } from "mobx-react-lite"
import { BooksList } from "./components/books-list/BooksList"
import { Actions } from "./components/actions/Actions"
import { useContext } from "react"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import { Filter } from "./components/filter/Filter"

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