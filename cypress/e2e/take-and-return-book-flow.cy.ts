import { AllBooksPage } from "./pages/AllBooksPage"
import { AddBookPage } from "./pages/AddBookPage"
import { BookPage } from "./pages/BookPage"
import { ReturnBookPage } from "./pages/ReturnBookPage"

describe(`Take and Return Book Flow`, () => {
  beforeEach(`Authorize and cleanup`, () => {
    cy.authByApi()
    cy.removeBooks()
  })

  afterEach(`Cleanup`, () => {
    cy.removeBooks()
  })

  it(`
  GIVEN created book
  WHEN take this book
  SHOULD display our name as a new reader name on the Book page
  AND return this book
  SHOULD not display our name as a new reader name on the Book page
  `, () => {
    AllBooksPage.visit()

    cy
      .intercept(
        `POST`, 
        `/api/books`)
      .as(`addBookRequest`)

    AddBookPage.addBook()

    cy
      .wait(`@addBookRequest`)
      .then((interception) => {
        const response = interception.response
        const bookId = response!.body.newBookId
       
        cy
          .intercept(
            `GET`, 
            `/api/books/${bookId}`)
          .as(`getBookDataRequest`)

        cy
          .getByData(`book-card`)
          .filter((_, element) => {
            return Cypress.$(element)
              .text()
              .includes(`[E2E-SMOKE] Новая книга`)
          })
          .should(`have.length`, 1)
          .click()

        cy
          .wait(`@getBookDataRequest`)
          .then((interception) => {
            const response = interception.response
            const bookCopyId = response!.body.bookCopiesIds[0]

            cy.getBookCopySecret({
              bookId,
              bookCopyId,
            })
              .then((secretKey) => {
                BookPage.visitCopy({
                  bookCopyId,
                  secretKey,
                })

                BookPage.checkDefaultBookPage()

                BookPage.takeBook()

                BookPage.visitCopy({
                  bookCopyId,
                  secretKey,
                })

                BookPage.checkBookPageAfterTakeBook()
            
                BookPage.clickReturnBookButton()

                ReturnBookPage.returnBook()

                cy
                  .intercept(
                    `GET`, 
                    `/api/books/copy/${bookCopyId}?secretKey=${secretKey}`)
                  .as(`getBookCopyDataRequest`)

                cy.wait(`@getBookCopyDataRequest`)

                BookPage.checkDefaultBookPage()
              })
          })
      })
  })
})
