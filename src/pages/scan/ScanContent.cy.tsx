import { ScanContent } from "./ScanContent"
import { ScanState } from "./state/ScanState"
import { ScanStateContext } from "./state/ScanStateContext"

describe(`ScanContent`, () => {
  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN scan page
  WHEN render
  SHOULD display the scan instruction and video element
  `, () => {
    mountComponent()

    cy
      .getByData(`scan-image`)
      .should(`exist`)
      
    cy
      .getByData(`scan-video`)
      .should(`exist`)
  })
}

function mountComponent({
  onUrlDetected = () => {},
}: {
  onUrlDetected?: ({
    url, 
  }: { 
    url: string, 
  }) => unknown,
} = {}) {
  const scanUrl = new ScanState()

  cy
    .mount(
      <ScanStateContext.Provider value={scanUrl}>
        <ScanContent onUrlDetected={onUrlDetected} />
      </ScanStateContext.Provider>,
    )
}
