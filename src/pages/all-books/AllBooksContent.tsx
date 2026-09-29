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
    isInOfficeOnly,
    hasActiveFilters,
    isLoading,
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
      {renderFilters()}
      <BooksList 
        cards={filteredBooks}
        isLoading={isLoading}
      />
    </>
  )

  function renderFilters() {
    if (isMobile) {
      return (
        <FilterMobile
          knowledgeAreas={knowledgeAreas}
          selectedAreasIds={selectedAreasIds}
          toggleKnowledgeArea={(knowledgeArea) => allBooksState.toggleKnowledgeArea(knowledgeArea)}
          isInOfficeOnly={isInOfficeOnly}
          toggleInOfficeOnly={() => allBooksState.toggleInOfficeOnly()}
          resetFilters={() => allBooksState.resetFilters()}
          resetToPreviouslyAppliedFilters={() => allBooksState.resetToPreviouslyAppliedFilters()}
          applyFilters={() => allBooksState.applyFilters()}
        />
      )
    }
    
    return (
      <FilterDesktop
        knowledgeAreas={knowledgeAreas}
        selectedAreasIds={selectedAreasIds}
        toggleKnowledgeArea={(knowledgeArea) => allBooksState.toggleKnowledgeArea(knowledgeArea)}
        isInOfficeOnly={isInOfficeOnly}
        toggleInOfficeOnly={() => allBooksState.toggleInOfficeOnly()}
        hasActiveFilters={hasActiveFilters}
        resetFilters={() => allBooksState.resetFilters()}
      />
    )
  }
})