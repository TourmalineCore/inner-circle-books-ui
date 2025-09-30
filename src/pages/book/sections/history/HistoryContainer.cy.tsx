import { MemoryRouter } from "react-router-dom"

import { HistoryStateContext } from "./state/HistoryStateContext"
import { HistoryContainer } from "./HistoryContainer"
import { HistoryState } from "./state/HistoryState"

const HISTORY_RESPONSE: HistoryType[] =[
  {
    id: 1,
    employee: `Ivanov Ivan`,
    borrowDate: new Date(`2025-08-30`),
    dueReturnDate: new Date(`2025-09-30`),
    actualReturnDate: new Date(`2025-09-21`),
    status: `Returned on time`,
    readingProgress: `Finished`,
  },
]

describe(`HistoryContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `*/history`,
      HISTORY_RESPONSE,
    )

    cy.viewport(1366, 768)
  })

  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN history data from network
  WHEN render the component
  SHOULD see it
  `, () => {
    mountComponent()
    cy.contains(`Employee`)

    cy.contains(`Ivanov Ivan`)
  })
}

function mountComponent() {
  const historyState = new HistoryState()

  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/books/1`,
        ]}>
        <HistoryStateContext.Provider value={historyState}>
          <HistoryContainer />
        </HistoryStateContext.Provider>
      </MemoryRouter>,
    )
}
