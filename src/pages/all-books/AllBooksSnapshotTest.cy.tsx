import { VIEWPORTS } from "../../common/constant"
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
    title: `Разработка ценностных предложений`,
    language: `ru`,
    authors: [
      {
        fullName: `Алекс Остервальдер`,
      },
      {
        fullName: `Сергей Николенко`,
      },
    ],
    bookCoverUrl: ``,
  }

  const cards = Array.from({
    length: 12,
  }, () => card)

  cy
    .mount(
      <AllBooksContent cards={cards} />,
    )
}