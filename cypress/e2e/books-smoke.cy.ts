import { AllBooksPage } from "./pages/AllBooksPage"

describe(`Books Smoke`, () => {
  beforeEach(`Authorize and cleanup`, () => {
    cy.authByApi()
  })

  it(`
  GIVEN books flow
  WHEN visit all books page
  SHOULD see it
  `, () => {
    // visit all books page
    AllBooksPage.visit()

    // check if page contains
    cy
      .getByData(`all-books-page`)
      .should(`be.visible`)
  })
})
