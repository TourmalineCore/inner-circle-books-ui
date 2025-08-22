import { ScanContainer } from "./ScanContainer"
import { ScanState } from "./state/ScanState"
import { ScanStateContext } from "./state/ScanStateContext"

const scanState = new ScanState()
    
describe(`ScanContainer`, () => {
  it(`
  GIVEN scan container
  WHEN mounted
  SHOULD reset scan url
  `, () => {
    cy
      .spy(scanState, `resetScanUrl`)
      .as(`resetScanUrl`)

    mountComponent()

    cy
      .get(`@resetScanUrl`)
      .should(`have.been.calledOnce`)
  })
})

function mountComponent() {
  cy
    .mount(
      <ScanStateContext.Provider value={scanState}>
        <ScanContainer />
      </ScanStateContext.Provider>,
    )
}
