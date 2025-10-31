import { AllBooksPage } from "./pages/AllBooksPage"
import { AddBookPage } from "./pages/AddBookPage"
import { BookPage } from "./pages/BookPage"

describe(`Books Smoke`, () => {
  beforeEach(`Authorize and cleanup`, () => {
    cy.authByApi()
    cy.removeBooks()
  })

  afterEach(`Cleanup`, () => {
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

  it(`
  GIVEN book with QR code pointing to copy ID 1
  WHEN QR code is scanned
  SHOULD redirect to /books/copy/1
  `, () => {
    const bookCopyId = 1

    BookPage.visitViaQR({
      bookCopyId,
    })

    cy
      .url()
      .should(`contain`,`/books/copy/${bookCopyId}`)
  })
})
