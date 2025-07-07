import { VIEWPORTS } from "../../../../common/constant"
import { BookCardsContent } from "./BookCardsContent"

describe(`Book Cards Snapshot test`, () => {
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
    bookCoverUrl: ``,
    title: `Разработка ценностных предложений. Как создавать товары и услуги, которые захотят купить потребители. Ваш первый шаг`,
    authors: [
      {
        fullName: `Алекс Остервальдер`,
      },
      {
        fullName: `Сергей Николенко`,
      },
    ],
    language: `rus`,
  }

  const cards = Array.from({
    length: 12,
  }, () => card)

  cy
    .mount(
      <BookCardsContent cards={cards} />,
    )
}