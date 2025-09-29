export class BookPage {
  static visit({
    bookId, 
  }: {
    bookId: number, 
  }) {
    cy.visit(`/books/${bookId}`)
  }

  static visitCopy({
    bookCopyId,
  }: {
    bookCopyId: number,
  }) {
    cy.visit(`/books/copy/${bookCopyId}`)
  }

  static visitViaQR({
    bookCopyId,
  }: {
    bookCopyId: number,
  }) {
    cy.visit(`/books?c=${bookCopyId}`)
  }

  static checkReadersBeforeTakeBook() {
    cy
      .contains(`Reading Now`)
      .should(`not.exist`)
  }

  static takeBook() {
    cy
      .get(`.book__wrap > .button`)
      .should(`have.text`, `Take Book`)
      .click()

    cy
      .get(`.modal-window__actions > .button__accent`)
      .click()
  }

  static checkBookPageAfterTakeBook() {
    cy
      .contains(`Reading Now`)
      .should(`exist`)

    cy
      .get(`.book__wrap > .button`)
      .should(`have.text`, `Return Book`)
  }

  static clickReturnBookButton() {
    cy
      .get(`.book__wrap > .button`)
      .should(`have.text`, `Return Book`)
      .click()
  }
}
