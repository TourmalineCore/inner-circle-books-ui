import { authService } from "../../../../../../common/authService"
import { MOCK_TOKEN } from "../../../../../../common/constant"
import { AllBooksState } from "../../../../state/AllBooksState"
import { AllBooksStateContext } from "../../../../state/AllBooksStateStateContext"
import { FilterModal } from "./FilterModal"

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

describe(`Filter Modal Snapshot test`, () => {
  VIEWPORTS.forEach((viewport) => {
    it(`Take the snapshot of filter modal ${viewport.width}x${viewport.height}`, () => {
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
          <FilterModal
            knowledgeAreas={MOCK_KNOWLEDGE_AREAS}
            selectedAreasIds={[]}
            toggleKnowledgeArea={()=>{}}
            applySelectedAreas={()=>{}}
            resetFilters={()=>{}}
            resetToPreviouslySelectedAreas={()=>{}}
            onClose={()=>{}}
          />
        </AllBooksStateContext.Provider>
      </authService.AuthContext.Provider>,
    )
}
