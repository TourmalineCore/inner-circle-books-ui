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
      .get(`.rating > :nth-child(4)`)
      .click()

    cy
      .getByData(`return-book-advantages`)
      .type(`Хорошая книга`)
    
    cy
      .getByData(`return-book-disadvantages`)
      .type(`Мало примеров`)

    cy
      .get(`.button__accent`)
      .click()
  }
}
