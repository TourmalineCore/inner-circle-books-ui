import { authService } from "../../../../common/authService"
import { MOCK_TOKEN } from "../../../../common/constant"
import { AllBooksState } from "../../state/AllBooksState"
import { AllBooksStateContext } from "../../state/AllBooksStateStateContext"
import { Actions } from "./Actions"

export const VIEWPORTS = [
  {
    width: 343,
    height: 1000,
  },
  {
    width: 720,
    height: 1000,
  },
  {
    width: 976,
    height: 1000,
  },
  {
    width: 1000,
    height: 1000,
  },
  {
    width: 1780,
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
            query={allBooksState.query}
            onQueryChange={(query) => allBooksState.setQuery(query)} 
          />,
        </AllBooksStateContext.Provider>
      </authService.AuthContext.Provider>,
    )
}
