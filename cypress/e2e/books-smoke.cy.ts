import { AllBooksPage } from "./pages/AllBooksPage"
import { AddBookPage } from "./pages/AddBookPage"

describe(`Books Smoke`, () => {
  beforeEach(`Authorize and cleanup`, () => {
    cy.authByApi()
    cy.removeBooks()
  })

  afterEach(`Authorize and cleanup`, () => {
    cy.removeBooks()
  })

  it(`
  GIVEN empty books list on the AllBooks page
  WHEN add a new book on the AddBook page
  SHOULD see it in the books list on the AllBooks page
  AND click on it
  SHOULD see it's correct creation data on the Book page
  `, () => {
    AllBooksPage.visit()

    AllBooksPage.checkNoBooks()

    AddBookPage.addBook()

    AllBooksPage.checkAddedBook()
  })
})
