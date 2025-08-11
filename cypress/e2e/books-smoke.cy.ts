import { AllBooksPage } from "./pages/AllBooksPage"

describe(`Books Smoke`, () => {
  beforeEach(`Authorize and cleanup`, () => {
    cy.authByApi()
    cy.removeBooks()
  })

  afterEach(`Authorize and cleanup`, () => {
    cy.removeBooks()
  })

  it(`
  GIVEN AllBooks page
  WHEN add a new book on the AddBooks page
  SHOULD see it in the books list on the AllBooks page
  AND click on it
  SHOULD see it's correct creation data on the Book page
  `, () => {
    AllBooksPage.visit()

    cy
      .getByData(`books-list`)
      .should(`not.exist`)

    cy
      .contains(`No books yet`)
      .should(`be.visible`)

    cy
      .get(`.actions__add-button > .button`)
      .click()

    cy
      .getByData(`add-book-title`)
      .type(`[E2E-SMOKE] Новая книга`)

    cy
      .contains(`English`)
      .click()

    cy
      .getByData(`add-book-annotation`)
      .type(`Описание книги`)

    cy
      .get(`.dynamic-input-list__input`)
      .type(`Первый Автор`)

    cy
      .get(`.dynamic-input-list__add`)
      .click()

    cy
      .get(`:nth-child(3) > .dynamic-input-list__input-wrapper > .dynamic-input-list__input`)
      .type(`Второй Автор`)

    cy
      .get(`.image-preview-input__input`)
      .type(`https://book.jpg`)

    cy
      .get(`.button__accent`)
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
      .get(`.book__title`)
      .should(`have.text`, `[E2E-SMOKE] Новая книга`)

    cy
      .get(`.book__annotation`)
      .should(`have.text`, `Описание книги`)   
      
    cy
      .get(`.book__characteristics`)
      .contains(`Первый Автор, Второй Автор`)
      
    cy
      .get(`.book__characteristics`)
      .contains(`English`)
  })
})
