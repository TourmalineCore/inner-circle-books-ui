import { authService } from "../../../../common/authService"
import { MOCK_TOKEN } from "../../../../common/constant"
import { AllBooksState } from "../../state/AllBooksState"
import { AllBooksStateContext } from "../../state/AllBooksStateStateContext"
import { Actions } from "./Actions"

export const VIEWPORTS = [
  {
    width: 375,
    height: 1000,
  },
  {
    width: 768,
    height: 1000,
  },
  {
    width: 1024,
    height: 1000,
  },
  {
    width: 1366,
    height: 1000,
  },
  {
    width: 1920,
    height: 1000,
  },
]

describe(`Actions Snapshot test`, () => {
  it(`Take the snapshot of actions`, () => {
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
        .getByData(`actions`)
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
          <Actions 
            searchQuery={allBooksState.searchQuery}
            onSearchQueryChange={(searchQuery) => allBooksState.setSearchQuery({
              searchQuery,
            })} 
          />
        </AllBooksStateContext.Provider>
      </authService.AuthContext.Provider>,
    )
}
