import { FilterDesktop } from "./FilterDesktop"

describe(`FilterDesktop`, () => {
  describe(`"In office" filter`, inOfficeFilterTests)
  describe(`Reset filters`, resetFiltersTests)
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

    mountComponent({
      toggleInOfficeOnly,
    })

    cy
      .contains(`In Office`)
      .click()

    cy
      .get(`@toggleInOfficeOnly`)
      .should(`have.been.calledOnce`)
  })
}

function resetFiltersTests() {
  it(`
  GIVEN no active filters
  WHEN render the component
  SHOULD NOT see reset filters button
  `, () => {
    mountComponent({
      hasActiveFilters: false,
    })

    cy
      .getByData(`reset-filters-button`)
      .should(`not.be.visible`)
  })

  it(`
  GIVEN active filters
  WHEN click reset filters button
  SHOULD call resetFilters once
  `, () => {
    const resetFilters = cy
      .spy()
      .as(`resetFilters`)

    mountComponent({
      hasActiveFilters: true,
      resetFilters,
    })

    cy
      .getByData(`reset-filters-button`)
      .click()

    cy
      .get(`@resetFilters`)
      .should(`have.been.calledOnce`)
  })
}

function mountComponent({
  hasActiveFilters = false,
  toggleInOfficeOnly = () => {},
  resetFilters = () => {},
}: {
  hasActiveFilters?: boolean,
  toggleInOfficeOnly?: () => unknown,
  resetFilters?: () => unknown,
} = {}) {
  cy.mount(
    <FilterDesktop
      knowledgeAreas={[]}
      selectedAreasIds={[]}
      toggleKnowledgeArea={() => {}}
      isInOfficeOnly={false}
      toggleInOfficeOnly={toggleInOfficeOnly}
      hasActiveFilters={hasActiveFilters}
      resetFilters={resetFilters}
    />,
  )
}
