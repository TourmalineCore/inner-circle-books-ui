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
    secretKey,
  }: {
    bookCopyId: number,
    secretKey: string,
  }) {
    cy.visit(`/books/copy/${bookCopyId}?s=${secretKey}`)
  }

  static visitViaQR({
    bookCopyId,
  }: {
    bookCopyId: number,
  }) {
    cy.visit(`/b?c=${bookCopyId}?s=abcd`)
  }

  static takeBook() {
    cy
      .get(`.book-action-button > .button`)
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
      .get(`.book-action-button > .button`)
      .should(`have.text`, `Return Book`)
  }

  static clickReturnBookButton() {
    cy
      .get(`.book-action-button > .button`)
      .should(`have.text`, `Return Book`)
      .click()
  }

  static checkDefaultBookPage() {
    cy
      .contains(`Reading Now`)
      .should(`not.exist`)

    cy
      .get(`.book-action-button > .button`)
      .should(`have.text`, `Take Book`)
  }

  static clickBookTrackingButton() {
    cy
      .getByData(`book-tracking-button`)
      .click()
  }
}
