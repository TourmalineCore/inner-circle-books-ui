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
    cy.visit(`/b?c=${bookCopyId}&s=abcd`)
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

  static checkEmptyFeedbackList() {
    cy
      .getByData(`book-feedback-text`)
      .should(`have.text`, `Let your colleagues know your opinion about this book after reading`)
  }

  static checkFeedbackList() {
    cy
      .getByData(`feedback-card-fullname`)
      .should(`exist`)  
    
    cy
      .getByData(`feedback-card-status`)
      .should(`have.text`, `Read in Part`) 

    cy
      .getByData(`feedback-card-rating`)
      .find(`.feedback-card__star`)
      .should(`have.length`, 5)

    cy
      .getByData(`feedback-card-rating`)
      .find(`.feedback-card__star--active`)
      .should(`have.length`, 4)
            
    cy
      .getByData(`feedback-card-advantages-text`)
      .should(`have.text`, `Хорошая книга`)       
      
    cy
      .getByData(`feedback-card-disadvantages-text`)
      .should(`have.text`, `Мало примеров`) 
  }

  static clickBookTrackingButton() {
    cy
      .getByData(`book-tracking-button`)
      .click()
  }
}
