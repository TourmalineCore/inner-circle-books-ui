import { ScanContent } from "./ScanContent"
import { ScanState } from "./state/ScanState"
import { ScanStateContext } from "./state/ScanStateContext"

describe(`ScanContent`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Url Detection`, urlDetectionTests)
})

function initializationTests() {
  it(`
  GIVEN scan page
  WHEN render
  SHOULD display the scan instruction and video element
  `, () => {
    mountComponent()

    cy
      .contains(`Чтобы отсканировать штрихкод, наведите на него камеру`)
      .should(`be.visible`)

    cy
      .getByData(`scan-video`)
      .should(`exist`)
  })
}

function urlDetectionTests() {
  it.skip(`
  GIVEN a detected url
  WHEN the qr code is scanned
  SHOULD call onUrlDetected with the correct URL
  `, () => {
    const testUrl = `http://example.com`

    const onUrlDetected = cy.stub()
      .as(`onUrlDetected`)

    mountComponent({
      onUrlDetected, 
    })

    cy.get(`@onUrlDetected`)
      .should(`have.been.calledWith`, {
        url: testUrl, 
      })
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
