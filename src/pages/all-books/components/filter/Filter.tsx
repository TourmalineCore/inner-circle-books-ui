import "./Filter.scss"
import FilterIcon from "../../../../assets/icons/Filter.svg?react"
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeft.svg?react"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Button } from "../../../../components/button/Button"

export const Filter = observer(({
  knowledgeAreas,
  selectedAreas,
  onToggleArea,
  resetFilters,
}: {
  knowledgeAreas: string[],
  selectedAreas: Set<string>,
  onToggleArea: (knowledgeArea: string) => void,
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
                className={`filter__chip ${selectedAreas.has(knowledgeArea) ? `filter__chip--active`: ``}`}
                onClick={() => onToggleArea(knowledgeArea)}
              >
                {knowledgeArea}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="filter-modal">
          <div className="filter-modal__header">
            <button
              type="button"
              className="filter-modal__back"
              onClick={() => setIsOpen(false)}
            >
              <ArrowLeftIcon />
            </button>

            <div className="filter-modal__title">
              Filters
            </div>
          </div>

          <div className="filter-modal__content">
            <div className="filter-modal__section">
              <h3 className="filter-modal__subtitle">
                Knowledge Areas
              </h3>

              <div className="filter__chips">
                {knowledgeAreas.map((knowledgeArea) => (
                  <button
                    key={knowledgeArea}
                    type="button"
                    className={`filter__chip ${selectedAreas.has(knowledgeArea) ? `filter__chip--active` : ``}`}
                    onClick={() => onToggleArea(knowledgeArea)}
                  >
                    {knowledgeArea}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="filter-modal__footer">
            <Button
              className="filter-modal__reset"
              onClick={resetFilters}
              label={<>Reset Filters</>}
            />
            <Button
              className="filter-modal__apply"
              onClick={() => setIsOpen(false)}
              label={<>Apply</>}
              isAccent
            />
          </div>
        </div>
      )}
    </>
  )
})