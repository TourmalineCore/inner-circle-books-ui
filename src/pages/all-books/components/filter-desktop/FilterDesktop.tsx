import ResetIcon from "../../../../assets/icons/Reset.svg?react"

import clsx from "clsx"
import { FilterChip } from "../../../../components/filter-chip/FilterChip"
import { Toggle } from "../../../../components/toggle/Toggle"
import { Button } from "../../../../components/button/Button"
import "./FilterDesktop.scss"

export function FilterDesktop({
  knowledgeAreas,
  selectedAreasIds,
  toggleKnowledgeArea,
  isInOfficeOnly,
  toggleInOfficeOnly,
  hasActiveFilters,
  resetFilters,
}: {
  knowledgeAreas: KnowledgeArea[],
  selectedAreasIds: number[],
  toggleKnowledgeArea: ({
    knowledgeAreaId,
  }: {
    knowledgeAreaId: number,
  }) => unknown,
  isInOfficeOnly: boolean,
  toggleInOfficeOnly: () => unknown,
  hasActiveFilters: boolean,
  resetFilters: () => unknown,
}) {
  return (
    <div 
      className="filter-desktop"
      data-cy="filter-desktop"
    >
      <div className="filter-desktop__chips">
        {knowledgeAreas.map(({
          id, name,
        }) => (
          <FilterChip
            key={id}
            id={id}
            name={name}
            className="filter-desktop__chip"
            isActive={selectedAreasIds.includes(id)}
            onClick={() => toggleKnowledgeArea({
              knowledgeAreaId: id,
            })}
          />
        ))}
      </div>

      <div className="filter-desktop__controls">
        <Toggle
          label="In Office"
          isChecked={isInOfficeOnly}
          onChange={toggleInOfficeOnly}
        />

        <div
          className={clsx(`filter-desktop__reset`, {
            'filter-desktop__reset--hidden': !hasActiveFilters,
          })}
        >
          <Button
            className="filter-desktop__reset-button"
            data-cy="reset-filters-button"
            onClick={resetFilters}
            label={
              <>
                <ResetIcon /> Reset Filters
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}
