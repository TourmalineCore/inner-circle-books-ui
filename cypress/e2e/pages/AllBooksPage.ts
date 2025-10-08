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
      .get(`.book__title`)
      .should(`have.text`, `[E2E-SMOKE] Новая книга`)

    cy
      .get(`.book__annotation`)
      .should(`have.text`, `Описание книги`)   
      
    cy
      .get(`.book__characteristics`)
      .contains(`Первый Автор, Второй Автор`)

    cy
      .get(`.book__characteristics > :nth-child(2)`)
      .contains(2)
      
    cy
      .get(`.book__characteristics`)
      .contains(`English`)
  }
}
