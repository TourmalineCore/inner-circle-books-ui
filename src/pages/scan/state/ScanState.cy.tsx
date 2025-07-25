import { ScanState } from "./ScanState"

describe(`ScanState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Set and Get`, setAndGetTests)
})

function initializationTests() {
  it(`
  GIVEN initial ScanState
  WHEN get scanUrl
  SHOULD return null
  `, () => {
    const scanState = new ScanState()

    expect(scanState.scanUrl).to.equal(null)
  })
}

function setAndGetTests() {
  it(`
  GIVEN ScanState
  WHEN call getInfoScan with a URL
  SHOULD update scanUrl
  `, () => {
    const scanState = new ScanState()

    scanState.getInfoScan(`http://example.com/scan.png`)

    expect(scanState.scanUrl).to.equal(`http://example.com/scan.png`)
  })

  it(`
  GIVEN ScanState with a URL
  WHEN call getInfoScan with null
  SHOULD reset scanUrl to null
  `, () => {
    
    const scanState = new ScanState()

    scanState.getInfoScan(`http://example.com/scan.png`)
    scanState.getInfoScan(null)

    expect(scanState.scanUrl).to.equal(null)
  })
}
