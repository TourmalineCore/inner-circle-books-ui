import { ScanContainer } from "./ScanContainer"
import { ScanState } from "./state/ScanState"
import { ScanStateContext } from "./state/ScanStateContext"

describe(`ScanContainer`, () => {
  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN scan page
  WHEN render the component
  SHOULD see it
  `, () => {
    mountComponent()

    cy
      .getByData(`scan`)
      .should(`exist`)
  })
}

function mountComponent() {
  const scanState = new ScanState()

  cy
    .mount(
      <ScanStateContext.Provider value={scanState}>
        <ScanContainer />
      </ScanStateContext.Provider>,
    )
}
