import { authService } from "../../../../../../common/authService"
import { MOCK_KNOWLEDGE_AREAS, MOCK_TOKEN } from "../../../../../../common/constant"
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
