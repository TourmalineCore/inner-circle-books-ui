import "./FilterModal.scss"
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeft.svg?react"
import { observer } from "mobx-react-lite"

export const FilterModal = observer(({
  knowledgeAreas,
  selectedAreas,
  onToggleArea,
  resetFilters,
  onClose,
}: {
  knowledgeAreas: string[],
  selectedAreas: Set<string>,
  onToggleArea: (area: string) => void,
  resetFilters: () => void,
  onClose: () => void,
}) => {
  return (
    <div className="filter-modal"
      data-cy="filter-modal">
      <div className="filter-modal__header">
        <button
          type="button"
          className="filter-modal__back"
          onClick={onClose}
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
          onClick={onClose}
        >
          Apply
        </button>
      </div>
    </div>
  )
})