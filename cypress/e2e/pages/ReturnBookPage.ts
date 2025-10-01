export class ReturnBookPage {
  static visit({
    bookCopyId,
  }: {
    bookCopyId: number,
  }) {
    cy.visit(`/books/return/copy/${bookCopyId}`)
  }

  static returnBook() {
    cy
      .get(`.return-book__progress-options > :nth-child(2)`)
      .click()

    cy
      .get(`.button__accent`)
      .click()
  }
}
