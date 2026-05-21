import './FilterMobile.scss'
import { useState } from "react"
import { FilterModal } from "./components/filter-modal/FilterModal"
import FilterIcon from "../../../../assets/icons/Filter.svg?react"

export function FilterMobile({
  knowledgeAreas,
  selectedAreasIds,
  toggleKnowledgeArea,
  resetFilters,
  applySelectedAreas,
  resetToPreviouslySelectedAreas,
}: {
  knowledgeAreas: KnowledgeArea[],
  selectedAreasIds: number[],
  toggleKnowledgeArea: ({
    knowledgeAreaId,
  }: {
    knowledgeAreaId: number,
  }) => unknown,
  resetFilters: () => unknown,
  applySelectedAreas: () => unknown,
  resetToPreviouslySelectedAreas: () => unknown,
}) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false)

  return (
    <div className="filter-mobile">
      <button
        type="button"
        className="filter-mobile__button"
        data-cy="open-mobile-filters-button"
        onClick={() => setIsOpen(true)}
      >
        <FilterIcon />
          Filters
      </button>

      {isOpen && (
        <FilterModal
          knowledgeAreas={knowledgeAreas}
          selectedAreasIds={selectedAreasIds}
          toggleKnowledgeArea={toggleKnowledgeArea}
          resetFilters={resetFilters}
          resetToPreviouslySelectedAreas={resetToPreviouslySelectedAreas}
          applySelectedAreas={applySelectedAreas}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}