import { MemoryRouter } from "react-router-dom"
import { ScanContainer } from "./ScanContainer"
import { ScanState } from "./state/ScanState"
import { ScanStateContext } from "./state/ScanStateContext"

describe(`ScanContainer`, () => {

  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN scan data from network
  WHEN render the component
  SHOULD see it
  `, () => {
    mountComponent()
   
  })
}

function mountComponent() {
  const scanState = new ScanState()

  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/scans/1`,
        ]}>
        <ScanStateContext.Provider value={scanState}>
          <ScanContainer />
        </ScanStateContext.Provider>
      </MemoryRouter>,
    )
}
