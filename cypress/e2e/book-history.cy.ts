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

                BookPage.clickBookTrackingButton()

                cy
                  .intercept(
                    `GET`, 
                    `/api/books/history/${bookCopyId}?draw=1&page=1&pageSize=10&orderBy=&orderingDirection=asc`)
                  .as(`getBookHistoryDataRequest`)
                
                cy.contains(`Reading now`)
                  
                cy.should(`not.contain`, `Read Partially`)

                cy.should(`not.contain`, `Returned`)

                BookPage.visitCopy({
                  bookCopyId,
                  secretKey,
                })

                BookPage.clickReturnBookButton()

                cy
                  .intercept(
                    `GET`, 
                    `/api/books/copy/${bookCopyId}?secretKey=${secretKey}`)
                  .as(`getBookCopyDataRequest`)
                  
                cy
                  .intercept(
                    `POST`, 
                    `/api/auth/refresh`,
                  )
                  .as(`refreshRequest`)
                  
                cy
                  .wait([
                    `@getBookCopyDataRequest`,
                    `@refreshRequest`,
                  ])

                ReturnBookPage.returnBook()

                BookHistoryPage.visit({
                  bookId,
                })

                cy.contains(`Read Partially`)

                cy.contains(`Returned`)
              })
            
          })
      })
  })
})
