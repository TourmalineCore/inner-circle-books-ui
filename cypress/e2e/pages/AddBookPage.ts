export class AddBookPage {
  static visit() {
    cy.visit(`/books/add`)
  }

  static addBook() {
    cy
      .get(`.actions__add-button > .button`)
      .click()

    cy
      .getByData(`add-book-title`)
      .type(`[E2E-SMOKE] Новая книга`)

    cy
      .getByData(`counter-input-button-plus`)
      .click()

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
  }
}
