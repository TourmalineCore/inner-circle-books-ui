/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>,
    authByApi(): Chainable<any>,
    removeBooks(): Chainable<any>,
    getBookCopySecret({
      bookId,
      bookCopyId,
    }: {
      bookId: number,
      bookCopyId: number,
    }): Chainable<any>,
  }
}
