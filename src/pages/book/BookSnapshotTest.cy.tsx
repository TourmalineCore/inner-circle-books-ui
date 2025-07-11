import { VIEWPORTS } from "../../common/constant"
import { BookContent } from "./BookContent"
import { BookState } from "./state/BookState"
import { BookStateContext } from "./state/BookStateStateContext"

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
        .getByData(`book`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const bookState = new BookState()
  
  bookState.initialize({
    loadedBook: {
      id: 1,
      title: `Разработка ценностных предложений`,
      annotation: `Аннотация`,
      count: 1,
      language: `rus`,
      authors: [
        {
          fullName: `Алекс Остервальдер`,
        },
      ],
      bookCoverUrl: `https://example.jpg`,
    },
  })

  cy
    .wrap(bookState)
    .as(`toDosState`)

  cy.mount(
    <BookStateContext.Provider value={bookState}>
      <BookContent/>
    </BookStateContext.Provider>,
  )
}
