/* eslint-disable array-bracket-newline */
import { VIEWPORTS } from "../../common/constant"
import { AddBookContent } from "./AddBookContent"
import { AddBookState } from "./state/AddBookState"
import { AddBookStateContext } from "./state/AddBookStateStateContext"

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

      mountComponent({})

      cy
        .getByData(`add-book-form`)
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
    authors: [``],
    coverUrl: ``,
  },
}: {
  initialState?: AddBookType,
} ) {
  const addBookState = new AddBookState()
  
  addBookState.initialize(initialState)

  cy
    .wrap(addBookState)
    .as(`addBookState`)

  cy
    .mount(
      <AddBookStateContext.Provider value={addBookState}>
        <AddBookContent onSubmit={() => {}} />
      </AddBookStateContext.Provider>,
    )
}
