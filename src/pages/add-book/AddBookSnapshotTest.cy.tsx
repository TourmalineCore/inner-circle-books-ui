/* eslint-disable array-bracket-newline */
import { AddBookContent } from "./AddBookContent"
import { AddBookState } from "./state/AddBookState"
import { AddBookStateContext } from "./state/AddBookStateStateContext"

export const VIEWPORTS = [
  {
    width: 375,
    height: 1576,
  },
  {
    width: 768,
    height: 1408,
  },
  {
    width: 1024,
    height: 820,
  },
  {
    width: 1366,
    height: 820,
  },
  {
    width: 1920,
    height: 1008,
  },
]

describe(`Add Book Snapshot test`, () => {
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

  cy.document().its("fonts.status").should("equal", "loaded")


      cy
        .getByData(`add-book`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent({
  initialState = {
    title: ``,
    count: 1,
    language: `rus`,
    annotation: ``,
    authors: [{
      fullName: ``,
    }],
    bookCoverUrl: ``,
  },
}: {
  initialState?: AddBookType,
} = {}) {
  const addBookState = new AddBookState()
  
  addBookState.initialize(initialState)

  cy
    .wrap(addBookState)
    .as(`addBookState`)

  cy
    .mount(
      <AddBookStateContext.Provider value={addBookState}>
        <AddBookContent
          onSubmit={() => {}}
          goToBooksList={() => {}}
        />
      </AddBookStateContext.Provider>,
    )
}
