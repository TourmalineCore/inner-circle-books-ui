import "./FilterModal.scss"
import FocusLock from 'react-focus-lock'
import { Button } from "../../../../../../components/button/Button"
import ArrowLeftIcon from "../../../../../../assets/icons/ArrowLeft.svg?react"
import { FilterChip } from "../../../../../../components/filter-chip/FilterChip"

export const FilterModal = ({
  knowledgeAreas,
  selectedAreasIds,
  toggleKnowledgeArea,
  applySelectedAreas,
  resetFilters,
  resetToPreviouslySelectedAreas,
  onClose,
}: {
  knowledgeAreas: KnowledgeArea[],
  selectedAreasIds: number[],
  toggleKnowledgeArea: ({
    knowledgeAreaId,
  }: {
    knowledgeAreaId: number,
  }) => unknown,
  resetFilters: () => unknown,
  resetToPreviouslySelectedAreas: () => unknown,
  applySelectedAreas: () => unknown,
  onClose: () => unknown,
}) => {
  return (
    <FocusLock
      returnFocus
    >
      <div 
        className="filter-modal"
        data-cy="filter-modal"
      >
        <div className="filter-modal__header">
          <button
            type="button"
            className="filter-modal__back"
            onClick={() => {
              onClose()
              resetToPreviouslySelectedAreas()
            }}
            aria-label="Exit filters modal window"
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

            <div className="filter-modal__chips">
              {knowledgeAreas.map(({
                id, name,
              }) => (
                <FilterChip
                  key={id}
                  id={id}
                  name={name}
                  isActive={selectedAreasIds.includes(id)}
                  onClick={() => toggleKnowledgeArea({
                    knowledgeAreaId: id,
                  })}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="filter-modal__footer">
          <Button
            className="filter-modal__button"
            onClick={resetFilters}
            label={`Reset Filters`}
          />

          <Button
            className="filter-modal__button"
            onClick={() => {
              onClose()
              applySelectedAreas()
            }}
            label={`Apply`}
            isAccent
          />
        </div>
      </div>
    </FocusLock>
  )
}