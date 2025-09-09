export class BookPage {
  static visit({
    bookId, 
  }: {
    bookId: number, 
  }) {
    cy.visit(`/books/${bookId}`)
  }

  static visitCopy({
    bookId, 
    bookCopyId,
  }: {
    bookId: number, 
    bookCopyId: number,
  }) {
    cy.visit(`/books/${bookId}?copyId=${bookCopyId}`)
  }

  static takeBook() {
    cy
      .get(`.book__wrap > .button`)
      .click()
              
    cy
      .contains(`Take Book`)
      .should(`be.visible`)

    cy
      .get(`.modal-window__actions > .button__accent`)
      .click()
  }
}
