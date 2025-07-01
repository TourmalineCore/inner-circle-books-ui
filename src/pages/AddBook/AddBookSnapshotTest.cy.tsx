/* eslint-disable array-bracket-newline */
import { AddBookContent } from "./AddBookContent"
import { AddBookState } from "./state/AddBookState"
import { AddBookStateContext } from "./state/AddBookStateStateContext"

describe(`Page Snapshot test with Cypress`, () => {

  const viewports = [
    {
      width: 343,
      height: 1420,
    },
    {
      width: 768,
      height: 1036,
    },
    {
      width: 1024,
      height: 1220,
    },
    {
      width: 1366,
      height: 1076,
    },
    {
      width: 1920,
      height: 1076,
    },
  ]

  it(`Take the snapshot of a result`, () => {

    viewports.forEach((viewport) => {
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

      cy.get(`[data-cy="add-book-form"]`)
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

  cy.wrap(addBookState)
    .as(`addBookState`)

  cy.mount(
    <AddBookStateContext.Provider value={addBookState}>
      <AddBookContent onSubmit={() => {}} />
    </AddBookStateContext.Provider>,
  )
}
