import { ScanState } from "./ScanState"
    
describe(`ScanState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Set and Get`, setAndGetTests)
})

function initializationTests() {
  const scanState = new ScanState()

  it(`
  GIVEN initial ScanState
  WHEN get scanUrl
  SHOULD return null
  `, () => {
    expect(scanState.scanUrl).to.equal(null)
  })
}

function setAndGetTests() {
  let scanState: ScanState

  beforeEach(() => {
    scanState = new ScanState()
  })

  it(`
  GIVEN ScanState
  WHEN call setScanUrl with a URL
  SHOULD update scanUrl
  `, () => {
    scanState.setScanUrl({
      url: `http://example.com`,
    })

    expect(scanState.scanUrl).to.equal(`http://example.com`)
  })

  it(`
  GIVEN ScanState with a URL
  WHEN call resetScanUrl
  SHOULD reset scanUrl to null
  `, () => {
    scanState.resetScanUrl()

    expect(scanState.scanUrl).to.equal(null)
  })
}
