import { FilterMobile } from "../filter-mobile/FilterMobile"
import { FilterDesktop } from "../filter-desktop/FilterDesktop"
import { useMediaQuery } from "react-responsive"

export function Filter({
  knowledgeAreas,
  selectedAreasIds,
  toggleKnowledgeArea,
  resetFilters,
  applySelectedAreas,
  resetToPreviouslySelectedAreas,
}: {
  knowledgeAreas: KnowledgeArea[],
  selectedAreasIds: number[],
  toggleKnowledgeArea: ({
    knowledgeAreaId,
  }: {
    knowledgeAreaId: number,
  }) => unknown,
  resetFilters: () => unknown,
  applySelectedAreas: () => unknown,
  resetToPreviouslySelectedAreas: () => unknown,
}) {
  const isMobile = useMediaQuery({
    maxWidth: 1365,
  })

  return (
    <>
      <div 
        className="filter"
        data-cy="filter">
        {
          isMobile ? 
            <FilterMobile
              knowledgeAreas={knowledgeAreas}
              selectedAreasIds={selectedAreasIds}
              toggleKnowledgeArea={toggleKnowledgeArea}
              resetFilters={resetFilters}
              resetToPreviouslySelectedAreas={resetToPreviouslySelectedAreas}
              applySelectedAreas={applySelectedAreas}
            /> 
            : 
            <FilterDesktop
              knowledgeAreas={knowledgeAreas}
              selectedAreasIds={selectedAreasIds}
              toggleKnowledgeArea={toggleKnowledgeArea}
            />
        }
      </div>
    </>
  )
}