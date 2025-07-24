import { ScanState } from "../state/ScanState"
import { ScanStateContext } from "../state/ScanStateContext"
import { CameraScanner } from "./CameraScanner"

describe(`ScanScanner`, () => {
  it(`SHOULD render component WHEN visit page`, () => {
    mountComponent({
      initialData: `/books/1`,
    })
  })

})

function mountComponent({
  initialData,
}: {
  initialData: string,
}) {
  function getInfoScanLoad() {}
  const scanUrl = new ScanState()

  scanUrl.getInfoScan(initialData)

  cy.mount(
    <ScanStateContext.Provider value={scanUrl}>
      <CameraScanner
        getInfoScanLoad={getInfoScanLoad}
        scanUrlState={scanUrl}
      />
    </ScanStateContext.Provider>
    ,
  )
}
