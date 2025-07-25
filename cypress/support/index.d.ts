/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>,
    authByApi(): Chainable<any>,
    removeBooks(): Chainable<any>,
  }
}
