import { ScanContainer } from "./ScanContainer"
import { ScanState } from "./state/ScanState"
import { ScanStateContext } from "./state/ScanStateContext"

describe(`ScanContainer`, () => {
  it(`
  GIVEN scan container
  WHEN mounted
  SHOULD reset scan url
`, () => {
    const scanState = new ScanState()
    cy.spy(scanState, `resetScanUrl`)
      .as(`resetScanUrl`)

    mountComponent(scanState)

    cy.get(`@resetScanUrl`)
      .should(`have.been.calledOnce`)
  })
})

function mountComponent(scanState?: ScanState) {
  const state = scanState ?? new ScanState()

  cy.mount(
    <ScanStateContext.Provider value={state}>
      <ScanContainer />
    </ScanStateContext.Provider>,
  )

  return state
}
