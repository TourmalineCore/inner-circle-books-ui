import { authService } from "../../common/authService"
import { MOCK_TOKEN, VIEWPORTS } from "../../common/constant"
import { Language } from "../../common/enums/language"
import { AllBooksContent } from "./AllBooksContent"

describe(`All Books Snapshot test`, () => {
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
        .getByData(`books-list`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const card =
  {
    title: `Разработка ценностных предложений. Как создавать товары и услуги, которые захотят купить потребители. Ваш первый шаг`,
    language: Language.RU,
    authors: [
      {
        fullName: `Алекс Остервальдер`,
      },
      {
        fullName: `Сергей Николенко`,
      },
    ],
    knowledgeAreas: [
      {
        id: 1,
        name: `Frontend`,
      },
    ],
    coverUrl: ``,
  }

  const cards = Array.from({
    length: 12,
  }, () => card)

  const mockAuthContext = [
    MOCK_TOKEN,
  ]

  cy.mount(
    <authService.AuthContext.Provider value={mockAuthContext}>
      <AllBooksContent
        cards={cards}
        query={``}
        onQueryChange={() => {}}
        knowledgeAreas={[
          `Frontend`,
          `Backend`,
          `Architecture`,
        ]}
        selectedAreas={new Set()}
        onToggleArea={() => {}}
        onResetFilters={() => {}}
      />
    </authService.AuthContext.Provider>,
  )
}