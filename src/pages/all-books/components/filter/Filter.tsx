import "./Filter.scss"
import clsx from "clsx"
import FilterIcon from "../../../../assets/icons/Filter.svg?react"
import { useState } from "react"
import { FilterModal } from "../filter-modal/FilterModal"

export function Filter({
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
    <>
      <div 
        className="filter"
        data-cy="filter">
        <button
          type="button"
          className="filter__mobile-button"
          data-cy="open-mobile-filters-button"
          onClick={() => setIsOpen(true)}
        >
          <FilterIcon />
          Filters
        </button>

        <div className="filter__desktop">
          <div className="filter__chips">
            {knowledgeAreas.map(({
              id, name,
            }) => (
              <button
                key={id}
                type="button"
                className={clsx(`filter__chip`, {
                  "filter__chip--active": selectedAreasIds.includes(id),
                })}
                onClick={() => toggleKnowledgeArea({
                  knowledgeAreaId: id,
                })}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

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
    </>
  )
}