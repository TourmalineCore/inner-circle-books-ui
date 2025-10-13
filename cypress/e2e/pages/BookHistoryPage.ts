export class BookHistoryPage {
  static visit({
    bookId,
  }: {
    bookId: number,
  }) {
    cy.visit(`/books/history/${bookId}`)
  }
}
