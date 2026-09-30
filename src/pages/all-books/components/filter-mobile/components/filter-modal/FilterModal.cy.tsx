import { FilterModal } from "./FilterModal"

describe(`FilterModal`, () => {
  describe(`"In office" filter`, inOfficeFilterTests)
})

function inOfficeFilterTests() {
  it(`
  GIVEN turned off "In office" filter
  WHEN click on it
  SHOULD call toggleInOfficeOnly once
  `, () => {
    const toggleInOfficeOnly = cy
      .spy()
      .as(`toggleInOfficeOnly`)

    cy.mount(
      <FilterModal
        knowledgeAreas={[]}
        selectedAreasIds={[]}
        toggleKnowledgeArea={() => {}}
        isInOfficeOnly={false}
        toggleInOfficeOnly={toggleInOfficeOnly}
        applyFilters={() => {}}
        resetFilters={() => {}}
        resetToPreviouslyAppliedFilters={() => {}}
        onClose={() => {}}
      />,
    )

    cy
      .contains(`In Office`)
      .click()

    cy
      .get(`@toggleInOfficeOnly`)
      .should(`have.been.calledOnce`)
  })
}
