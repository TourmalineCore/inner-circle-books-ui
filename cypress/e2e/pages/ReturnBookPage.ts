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
      .get(`.book-feedback-form__progress-options > :nth-child(2)`)
      .click()

    cy
      .get(`.rating > :nth-child(4)`)
      .click()

    cy
      .getByData(`book-feedback-form-advantages`)
      .type(`Хорошая книга`)
    
    cy
      .getByData(`book-feedback-form-disadvantages`)
      .type(`Мало примеров`)

    cy
      .get(`.button__accent`)
      .click()
  }
}
