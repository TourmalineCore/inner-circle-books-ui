/// <reference types="cypress" />
import { createAuthService } from '@tourmalinecore/react-tc-auth'
import compareSnapshotCommand from 'cypress-image-diff-js'

Cypress.on(`uncaught:exception`, () => false)

Cypress.on(`uncaught:exception`, (err) => {
  // we expect a 3rd party library error with message 'list not defined'
  // and don't want to fail the test so we return false
  if (err.message.includes(`Request failed with status code`)) {
    return false
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test

  return true
})

Cypress.Commands.add(`getByData`, (selector) => cy.get(`[data-cy=${selector}]`))
Cypress.Screenshot.defaults({
  capture: `viewport`,
  scale: false,
})

export { }

Cypress.Commands.add(`authByApi`, () => {
  let accessToken: any
  const authService = createAuthService({
    authApiRoot: Cypress.env(`AUTH_API_ROOT_URL`),
    authType: `ls`,
    tokenAccessor: `accessToken`,
    refreshTokenAccessor: `refreshToken`,
    tokenValueAccessor: `value`,
    tokenExpireAccessor: `expiresInUtc`,
  })

  cy
    .request({
      method: `POST`,
      url: `${Cypress.env(`AUTH_API_ROOT_URL`)}/login`,
      body: {
        login: Cypress.env(`USER_LOGIN`),
        password: Cypress.env(`USER_PASSWORD`),
      },
    })
    .then(({
      body: loginResponseBody,
    }) => {
      authService.setLoggedIn(loginResponseBody)

      accessToken = loginResponseBody.accessToken
      cy
        .window()
        .then((window) => {
          window.localStorage.setItem(`accessToken`, JSON.stringify(accessToken))
        })

      Cypress.env(`accessToken`, accessToken.value)
    })
})

Cypress.Commands.add(`removeBooks`, () => {
  cy.request<{ 
    books: BookCardType[], 
  }>({
    method: `GET`,
    url: `${Cypress.env(`API_ROOT_URL`)}`,
    headers: {
      Authorization: `Bearer ${Cypress.env(`accessToken`)}`,
    },
  })
    .then(({
      body,
    }) => {
      const booksToDelete = body.books.filter(({
        title,
      }) => title.startsWith(`[E2E-SMOKE]`))

      booksToDelete.forEach(({
        id,
      }) => {
        cy.request({
          method: `DELETE`,
          url: `${Cypress.env(`API_ROOT_URL`)}/${id}/hard-delete`,
          headers: {
            Authorization: `Bearer ${Cypress.env(`accessToken`)}`,
          },
        })
      })
    })
})

Cypress.Commands.add(`getBookCopySecret`, ({
  bookId,
  bookCopyId,
}: {
  bookId: number,
  bookCopyId: number,
}) => {
  return cy.request<ModalQrFormType>({
    method: `GET`,
    url: `${Cypress.env(`API_ROOT_URL`)}/copies/${bookId}`,
    headers: {
      Authorization: `Bearer ${Cypress.env(`accessToken`)}`,
    },
  })
    .then(({
      body,
    }) => {
      return body
        .bookCopies
        .find((bookCopy) => bookCopy.bookCopyId === bookCopyId)?.secretKey
    })
})

compareSnapshotCommand()
