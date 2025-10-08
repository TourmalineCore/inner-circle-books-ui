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

  afterEach(`Authorize and cleanup`, () => {
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
            const bookCopyId = response!.body.bookCopies[0].bookCopyId

            BookPage.visitCopy({
              bookCopyId,
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

            cy.getByData(`table-cell`)
              .first()
              .contains(1)

            cy.contains(`08.10.2025`)
            
            cy.contains(`08.01.2026`)

            cy.should(`not.contain`, `Read Partially`)

            cy.should(`not.contain`, `Returned`)
    
            BookPage.visitCopy({
              bookCopyId,
            })
  
            cy
              .intercept(
                `GET`, 
                `/api/books/copy/${bookCopyId}`)
              .as(`getBookCopyDataRequest`)

            cy.wait(`@getBookCopyDataRequest`)

            BookPage.clickReturnBookButton()

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
