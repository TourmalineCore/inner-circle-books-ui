import { MemoryRouter } from "react-router-dom"
import { VIEWPORTS } from "../../common/constant"
import { ScanPage } from "./ScanPage"
import { ScanState } from "./state/ScanState"
import { ScanStateContext } from "./state/ScanStateContext"

describe(`Scan Page Snapshot test`, () => {
  it(`Take the snapshot of a result`, () => {
    VIEWPORTS.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)

      cy.wrap(
        Cypress.automation(`remote:debugger:protocol`, {
          command: `Emulation.setDeviceMetricsOverride`,
          params: {
            width: viewport.width,
            height: viewport.height,
            deviceScaleFactor: 1,
            mobile: false,
          },
        }),
      )

      mountComponent()

      cy
        .window()
        .then((win) => win.document.fonts.ready)

      cy
        .getByData(`scan`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const scanState = new ScanState()
  
  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/scans/1`,
        ]}>
        <ScanStateContext.Provider value={scanState}>
          <ScanPage/>
        </ScanStateContext.Provider>,
      </MemoryRouter>,
    )
}
