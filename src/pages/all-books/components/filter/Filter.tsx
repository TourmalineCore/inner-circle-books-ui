import "./Filter.scss"
import FilterIcon from "../../../../assets/icons/Filter.svg?react"
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeft.svg?react"
import { observer } from "mobx-react-lite"
import { useState } from "react"

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
      <div className="filter">
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
        <div className="filter-modal"
          data-cy="filter-modal">
          <div className="filter-modal__header">
            <button
              type="button"
              className="filter-modal__back"
              onClick={() => setIsOpen(false)}
            >
              <ArrowLeftIcon />
            </button>

            <h2 className="filter-modal__title">
              Filters
            </h2>
          </div>

          <div className="filter-modal__content">
            <div className="filter-modal__section">
              <h3 className="filter-modal__subtitle">
                Knowledge Areas
              </h3>

              <div className="filter__chips">
                {knowledgeAreas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    className={`filter__chip ${selectedAreas.has(area) ? `filter__chip--active` : ``}`}
                    onClick={() => onToggleArea(area)}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="filter-modal__footer">
            <button
              type="button"
              className="filter-modal__reset"
              onClick={resetFilters}
            >
              Reset Filters
            </button>

            <button
              type="button"
              className="filter-modal__apply"
              onClick={() => setIsOpen(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  )
})