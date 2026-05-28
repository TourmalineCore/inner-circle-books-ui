import { MemoryRouter } from "react-router-dom"
import { BookHistoryContainer } from "./BookHistoryContainer"
import { ProgressOfReading } from "../../common/enums/progressOfReading"

const BOOK_HISTORY_RESPONSE: BookHistoryType = {
  list: [
    {
      id: 1,
      bookCopyId: 1,
      employeeFullName: `Ivanov Ivan`,
      takenDate: `2025-08-20`,
      scheduledReturnDate: `2025-09-23`,
      actualReturnedDate: `2025-09-24`,
      progressOfReading: ProgressOfReading.ReadEntirely,
    },
  ],
  totalCount: 1,
}

describe(`BookHistoryContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `*/books/history/1?draw=1&page=1&pageSize=10&orderBy=&orderingDirection=asc`,
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
    
    cy
      .getByData(`table-cell`)
      .contains(`1`)
     
    cy.contains(`Employee`)

    cy.contains(`Ivanov Ivan`)

    cy.contains(`2025-08-20`)
    
    cy.contains(`2025-09-23`)

    cy.contains(`2025-09-24`)

    cy.contains(`Returned`)

    cy.contains(`Read Entirely`)
  })
}

function mountComponent() {

  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/books/history/1`,
        ]}>
        <BookHistoryContainer />
      </MemoryRouter>,
    )
}