import "./FilterModal.scss"
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeft.svg?react"
import { observer } from "mobx-react-lite"
import { Button } from "../../../../components/button/Button"
import { useState } from "react"

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
  const [
    localSelectedAreas,
    setLocalSelectedAreas,
  ] = useState<Set<string>>(new Set(selectedAreas))

  function handleToggleArea(area: string) {
    const newSet = new Set(localSelectedAreas)
    if (newSet.has(area)) {
      newSet.delete(area)
    }
    else {
      newSet.add(area)
    }
    setLocalSelectedAreas(newSet)
  }

  function handleApply() {
    localSelectedAreas.forEach(area => {
      if (!selectedAreas.has(area)) {
        onToggleArea(area)
      }
    })
    selectedAreas.forEach(area => {
      if (!localSelectedAreas.has(area)) {
        onToggleArea(area)
      }
    })
    onClose()
  }

  const handleReset = () => {
    setLocalSelectedAreas(new Set())
    resetFilters()
  }

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
                className={`filter__chip ${localSelectedAreas.has(area) ? `filter__chip--active` : ``}`}
                onClick={() => handleToggleArea(area)}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-modal__footer">
        <Button
          className="filter-modal__button"
          onClick={handleReset}
          label={<>Reset Filters</>}
        />

        <Button
          className="filter-modal__button"
          onClick={handleApply}
          label={<>Apply</>}
          isAccent
        />
      </div>
    </div>
  )
})