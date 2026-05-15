import { authService } from "../../../../common/authService"
import { MOCK_TOKEN } from "../../../../common/constant"
import { AllBooksState } from "../../state/AllBooksState"
import { AllBooksStateContext } from "../../state/AllBooksStateStateContext"
import { Filter } from "../filter/Filter"

export const VIEWPORTS = [
  {
    width: 375,
    height: 812,
  },
  {
    width: 768,
    height: 1024,
  },
  {
    width: 1024,
    height: 768,
  },
]

export const MOCK_KNOWLEDGE_AREAS = [
  `Backend`,
  `Business and Management`,
  `Design`,
  `DevOps`,
  `Embedded`,
  `Frontend`,
  `Game Dev`,
  `Marketing`,
  `Information Security`,
  `ML`,
  `Psychology`,
  `QA`,
]

describe(`Filter Modal Snapshot test`, () => {
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
        .getByData(`open-mobile-filters-button`)
        .click()

      cy
        .getByData(`filter-modal`)
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
          <Filter 
            knowledgeAreas={MOCK_KNOWLEDGE_AREAS}
            selectedAreas={new Set<string>()}
            onToggleArea={()=>{}}
            resetFilters={()=>{}}
          />
        </AllBooksStateContext.Provider>
      </authService.AuthContext.Provider>,
    )
}
