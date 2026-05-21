import { authService } from "../../../../common/authService"
import { MOCK_KNOWLEDGE_AREAS, MOCK_TOKEN } from "../../../../common/constant"
import { AllBooksState } from "../../state/AllBooksState"
import { AllBooksStateContext } from "../../state/AllBooksStateStateContext"
import { FilterDesktop } from "./FilterDesktop"

export const VIEWPORTS = [
  {
    width: 1366,
    height: 1000,
  },
  {
    width: 1920,
    height: 1000,
  },
]

describe(`Filter Desktop Snapshot test`, () => {
  it(`Take the snapshot of filter modal`, () => {
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
        .getByData(`filter-desktop`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const allBooksState = new AllBooksState()
  const mockAuthContext = [
    MOCK_TOKEN,
  ]

  cy
    .mount(
      <authService.AuthContext.Provider value={mockAuthContext}>
        <AllBooksStateContext.Provider value={allBooksState}>
          <FilterDesktop 
            knowledgeAreas={MOCK_KNOWLEDGE_AREAS}
            selectedAreasIds={[]}
            toggleKnowledgeArea={()=>{}}
          />
        </AllBooksStateContext.Provider>
      </authService.AuthContext.Provider>,
    )
}
