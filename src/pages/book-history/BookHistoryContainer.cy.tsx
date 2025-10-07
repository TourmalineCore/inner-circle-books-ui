import { MemoryRouter } from "react-router-dom"

import { BookHistoryStateContext } from "./state/BookHistoryStateContext"
import { BookHistoryContainer } from "./BookHistoryContainer"
import { BookHistoryState } from "./state/BookHistoryState"

const BOOK_HISTORY_RESPONSE: BookHistoryType = {
  list: [
    {
      copyNumber: 1,
      employeeFullName: `Ivanov Ivan`,
      takenDate: `20.08.2025`,
      scheduledReturnDate: `23.09.2025`,
      actualReturnedDate: `24.09.2025`,
      progressOfReading: `Finished`,
    },
  ],
  totalCount: 1,
}

describe(`BookHistoryContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `*/history/1?draw=1&page=1&pageSize=10&orderBy=&orderingDirection=asc`,
      BOOK_HISTORY_RESPONSE,
    )

    cy.viewport(1366, 768)
  })

  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN book history data from network
  WHEN render the component
  SHOULD see it
  `, () => {
    mountComponent()
    cy.getByData(`table-cell`)
      .contains(`1`)
     
    cy.contains(`Employee`)

    cy.contains(`Ivanov Ivan`)

    cy.contains(`20.08.2025`)
    
    cy.contains(`23.09.2025`)

    cy.contains(`24.09.2025`)

    cy.contains(`Returned`)

    cy.contains(`Finished`)
  })
}

function mountComponent() {
  const bookHistoryState = new BookHistoryState()

  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/books/history/1`,
        ]}>
        <BookHistoryStateContext.Provider value={bookHistoryState}>
          <BookHistoryContainer />
        </BookHistoryStateContext.Provider>
      </MemoryRouter>,
    )
}