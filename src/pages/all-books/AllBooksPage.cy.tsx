import { authService } from "../../common/authService"
import { AllBooksState } from "./state/AllBooksState"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import { MOCK_TOKEN } from "../../common/constant"
import { AllBooksPage } from "./AllBooksPage"
import { MemoryRouter } from "react-router-dom"

describe(`AllBooksPage`, () => {
  describe(`Add book copy after add book in all books page`, addBookCopyAfterAddBookInAllBooksPageTests)
})

function addBookCopyAfterAddBookInAllBooksPageTests() {
  it(`
  GIVEN all books page with an open modal window with QR codes
  WHEN user add copy
  THEN make complete network call with the addedBookId to add book copy
  AND complete network call to load book copies
  `, () => {
    cy.intercept(
      `GET`,
      `*/books/copies/1`,
    )
      .as(`load-book-copies`)
      
    cy.intercept(
      `POST`,
      `*/books/1/add-copy`,
    )
      .as(`add-copy`)
    
    mountComponent()

    cy
      .getByData(`add-copy-button`)
      .click()

    cy
      .getByData(`accept-button`)
      .click()

    cy.wait(`@add-copy`)

    cy.wait(`@load-book-copies`)
  })
}

function mountComponent() {
  const allBooksState = new AllBooksState()

  const mockAuthContext = [
    MOCK_TOKEN,
  ]
  
  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/books?addedBookId=1`,
        ]}>
        <authService.AuthContext.Provider value={mockAuthContext}>
          <AllBooksStateContext.Provider value={allBooksState}>
            <AllBooksPage />
          </AllBooksStateContext.Provider>
        </authService.AuthContext.Provider>
      </MemoryRouter>,
    )
}
