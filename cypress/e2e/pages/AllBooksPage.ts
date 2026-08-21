export class AllBooksPage {
  static visit() {
    cy.visit(`/books`)
  }

  static checkNoBooks() {
    cy
      .getByData(`books-list`)
      .should(`not.exist`)

    cy
      .contains(`No books yet`)
      .should(`be.visible`)
  }

  static checkAddedBook() {
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
      .getByData(`book-title`)
      .should(`have.text`, `[E2E-SMOKE] Новая книга`)

    cy
      .getByData(`book-annotation`)
      .should(`have.text`, `Описание книги`)   
      
    cy
      .getByData(`book-info`)
      .contains(`Первый Автор, Второй Автор`)

    cy
      .getByData(`book-copies`)
      .contains(2)
      
    cy
      .getByData(`book-info`)
      .contains(`English`)
  }
}
