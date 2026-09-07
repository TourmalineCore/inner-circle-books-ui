import { AllBooksPage } from "./pages/AllBooksPage"
import { AddBookPage } from "./pages/AddBookPage"
import { BookPage } from "./pages/BookPage"
import { ReturnBookPage } from "./pages/ReturnBookPage"
import { BookHistoryPage } from "./pages/BookHistoryPage"

describe(`Adding book history entries`, () => {
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
  AND go to book history page
  SHOULD display a record of taking a book
  THEN return this book
  SHOULD display a record of return a book
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
          .getByData(`modal-qr-form-close-button`)
          .click()
          
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

                BookPage.takeBook()

                BookPage.visit({
                  bookId,
                })

                cy
                  .intercept(
                    `GET`, 
                    `/api/books/history/${bookId}?draw=1&page=1&pageSize=10&orderBy=&orderingDirection=asc`)
                  .as(`getBookHistoryDataRequest`)

                BookPage.clickBookTrackingButton()

                cy.wait(`@getBookHistoryDataRequest`)

                cy.contains(`Reading now`)
                  
                cy.should(`not.contain`, `Read Partially`)

                cy.should(`not.contain`, `Returned`)

                BookPage.visitCopy({
                  bookCopyId,
                  secretKey,
                })

                cy
                  .intercept(
                    `GET`,
                    `/api/books/copy/${bookCopyId}?secretKey=${secretKey}`)
                  .as(`getBookCopyDataRequest`)

                BookPage.clickReturnBookButton()

                cy.wait(`@getBookCopyDataRequest`)

                cy
                  .intercept(
                    `POST`,
                    `/api/books/return`)
                  .as(`returnBookRequest`)

                ReturnBookPage.returnBook()

                cy.wait(`@returnBookRequest`)

                // a successful return sends the app back to the copy page. Without waiting for
                // that navigation it lands after the visit below and takes the browser off the
                // history page, which then never asks for its data
                cy
                  .location(`pathname`)
                  .should(`eq`, `/books/copy/${bookCopyId}`)

                BookHistoryPage.visit({
                  bookId,
                })

                cy.wait(`@getBookHistoryDataRequest`)

                cy.getByData(`table-cell`)
                  .should(`contain`, `Read Partially`)

                cy.getByData(`table-cell`)
                  .should(`contain`, `Returned`)
              })
          })
      })
  })
})
