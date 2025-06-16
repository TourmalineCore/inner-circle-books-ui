/// <reference types="cypress" />

import { BooksPage } from "./BooksPage"

describe(`Page Snapshot test with Cypress`, () => {
  const viewports = [
    {
      width: 768,
      height: 1024,
    },
    {
      width: 1366,
      height: 1024,
    },
  ]

  it(`Take the snapshot of a result`, () => {

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)

      mountComponent()

      cy.get(`[data-cy="books-page"]`)
        .compareSnapshot(`page`)
    })
  })
})

function mountComponent() {
  cy.mount(
    <BooksPage />,
  )
}