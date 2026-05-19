import "./FilterDesktop.scss"
import clsx from "clsx"

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
    <>
      <div className="filter__desktop">
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
    </>
  )
}