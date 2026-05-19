import "./FilterModal.scss"
import clsx from "clsx"
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeft.svg?react"
import { Button } from "../../../../components/button/Button"

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
    <div className="filter-modal"
      data-cy="filter-modal">
      <div className="filter-modal__header">
        <button
          type="button"
          className="filter-modal__back"
          onClick={() => {
            onClose()
            resetToPreviouslySelectedAreas()
          }}
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
  )
}