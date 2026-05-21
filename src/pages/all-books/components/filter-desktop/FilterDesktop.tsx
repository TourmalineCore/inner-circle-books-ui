import { FilterChip } from "../../../../components/filter-chip/FilterChip"
import "./FilterDesktop.scss"

export function FilterDesktop({
  knowledgeAreas,
  selectedAreasIds,
  toggleKnowledgeArea,
}: {
  knowledgeAreas: KnowledgeArea[],
  selectedAreasIds: number[],
  toggleKnowledgeArea: ({
    knowledgeAreaId,
  }: {
    knowledgeAreaId: number,
  }) => unknown,
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
    </div>
  )
}