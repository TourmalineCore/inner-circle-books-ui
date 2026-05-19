import { authService } from "../../../../common/authService"
import { MOCK_TOKEN } from "../../../../common/constant"
import { AllBooksState } from "../../state/AllBooksState"
import { AllBooksStateContext } from "../../state/AllBooksStateStateContext"
import { Filter } from "./Filter"

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

export const MOCK_KNOWLEDGE_AREAS = [
  {
    id: 1,
    name: `Backend`,
  },
  {
    id: 2,
    name: `Business and Management`,
  },
  {
    id: 3,
    name: `Design`,
  },
  {
    id: 4,
    name: `DevOps`,
  }, 
  {
    id: 5,
    name: `Embedded`,
  },
  {
    id: 6,
    name: `Frontend`,
  },
  {
    id: 7,
    name: `Game Dev`,
  },
  {
    id: 8,
    name: `Marketing`,
  },
  {
    id: 9,
    name: `Information Security`,
  },
  {
    id: 10,
    name: `ML`,
  },
  {
    id: 11,
    name: `Psychology`,
  },
  {
    id: 12,
    name: `QA`,
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
        .getByData(`filter`)
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
            selectedAreasIds={[]}
            toggleKnowledgeArea={()=>{}}
            resetFilters={()=>{}}
            applySelectedAreas={()=>{}}
            resetToPreviouslySelectedAreas={()=>{}}
          />
        </AllBooksStateContext.Provider>
      </authService.AuthContext.Provider>,
    )
}
