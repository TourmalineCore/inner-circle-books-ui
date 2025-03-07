import { BooksPage } from "./pages/BooksPage"

describe(`Books Smoke`, () => {
  beforeEach(`Authorize and cleanup`, () => {
    cy.authByApi()
  })

  it(`
  GIVEN books flow
  WHEN visit page
  SHOULD see init text
  `, () => {
    // visit books page
    BooksPage.visit()

    // check if page contains init text
    cy
      .getByData(`books-page`)
      .should(`have.text`, `This is init books page`)
  })
})
