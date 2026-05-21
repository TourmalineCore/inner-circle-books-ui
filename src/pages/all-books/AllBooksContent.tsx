import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import { BooksList } from "./components/books-list/BooksList"
import { Actions } from "./components/actions/Actions"
import { FilterMobile } from "./components/filter-mobile/FilterMobile"
import { FilterDesktop } from "./components/filter-desktop/FilterDesktop"
import { useMediaQuery } from "react-responsive"

export const AllBooksContent = observer(() => {
  const allBooksState = useContext(AllBooksStateContext)

  const {
    searchQuery,
    filteredBooks,
    knowledgeAreas,
    selectedAreasIds,
  } = allBooksState
   
  const isMobile = useMediaQuery({
    maxWidth: 1365,
  })
  
  return (
    <>
      <Actions
        searchQuery={searchQuery}
        onSearchQueryChange={(searchQuery) => allBooksState.setSearchQuery({
          searchQuery,
        })}
      />
      {
        isMobile ? 
          <FilterMobile
            knowledgeAreas={knowledgeAreas}
            selectedAreasIds={selectedAreasIds}
            toggleKnowledgeArea={(knowledgeArea) => allBooksState.toggleKnowledgeArea(knowledgeArea)}
            resetFilters={() => allBooksState.resetFilters()}
            resetToPreviouslySelectedAreas={() => allBooksState.resetToPreviouslySelectedAreas()}
            applySelectedAreas={() => allBooksState.applySelectedAreas()}
          /> 
          : 
          <FilterDesktop
            knowledgeAreas={knowledgeAreas}
            selectedAreasIds={selectedAreasIds}
            toggleKnowledgeArea={(knowledgeArea) => allBooksState.toggleKnowledgeArea(knowledgeArea)}
          />
      }
      <BooksList cards={filteredBooks} />
    </>
  )
})