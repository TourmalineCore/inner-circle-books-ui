import "./Filter.scss"
import clsx from "clsx"
import FilterIcon from "../../../../assets/icons/Filter.svg?react"
import { useState } from "react"
import { FilterModal } from "../filter-modal/FilterModal"

export const Filter = ({
  knowledgeAreas,
  selectedAreas,
  onToggleArea,
  resetFilters,
}: {
  knowledgeAreas: string[],
  selectedAreas: Set<string>,
  onToggleArea: (knowledgeArea: string) => unknown,
  resetFilters: () => unknown,
}) => {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false)

  return (
    <>
      <div className="filter"
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
            {knowledgeAreas.map((knowledgeArea) => (
              <button
                key={knowledgeArea}
                type="button"
                className={clsx(`filter__chip`, {
                  "filter__chip--active": selectedAreas.has(knowledgeArea),
                })}
                onClick={() => onToggleArea(knowledgeArea)}
              >
                {knowledgeArea}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <FilterModal
          knowledgeAreas={knowledgeAreas}
          selectedAreas={selectedAreas}
          onToggleArea={onToggleArea}
          resetFilters={resetFilters}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}