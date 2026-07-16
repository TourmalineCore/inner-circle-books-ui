import { ModalQRFormContainer } from "./ModalQRFormContainer"
import { ModalQRFormState } from "./state/ModalQRFormState"
import { ModalQRFormStateContext } from "./state/ModalQRFormStateContext"

describe(`ModalQRFormContainer`, () => {
  describe(`Add book copy`, addBookCopyTests)
})

function addBookCopyTests() {
  it(`
  GIVEN opened modal qr form
  WHEN click on the "Add copy" button
  THEN make complete network call with the id in url to add copy
  AND make complete network call to get book copies to update the list of copies of books
  `, () => {
    cy.intercept(
      `POST`,
      `*/books/1/add-copy`,
      {
        statusCode: 200,
      },
    )
      .as(`add-book-copy`)

    cy.intercept(
      `GET`,
      `*/books/copies/1`,
      {
        statusCode: 200,
        body: {
          bookTitle: ``,
          bookCopies: [],
        },
      },
    )
      .as(`get-book-copies`)
    
    mountComponent({
      bookId: `1`,
    })

    cy
      .getByData(`add-copy-button`)
      .click()

    cy
      .getByData(`accept-button`)
      .click()

    cy.wait(`@add-book-copy`)

    cy.wait(`@get-book-copies`)
  })
}

function mountComponent({
  bookId,
}: {
  bookId: string,
}) {
  const modalQRFormState = new ModalQRFormState()

  cy.viewport(1366, 750)
  
  cy
    .mount(
      <ModalQRFormStateContext.Provider value={modalQRFormState}>
        <ModalQRFormContainer
          bookId={bookId}
          onCloseModal={() => {}}/>
      </ModalQRFormStateContext.Provider>,

    )
}