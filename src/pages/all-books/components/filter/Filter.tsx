import "./Filter.scss"
import FilterIcon from "../../../../assets/icons/Filter.svg?react"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { FilterModal } from "../filter-modal/FilterModal"

export const Filter = observer(({
  knowledgeAreas,
  selectedAreas,
  onToggleArea,
  resetFilters,
}: {
  knowledgeAreas: string[],
  selectedAreas: Set<string>,
  onToggleArea: (area: string) => void,
  resetFilters: () => void,
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
            {knowledgeAreas.map((area) => (
              <button
                key={area}
                type="button"
                className={`filter__chip ${selectedAreas.has(area) ? `filter__chip--active`: ``}`}
                onClick={() => onToggleArea(area)}
              >
                {area}
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
})