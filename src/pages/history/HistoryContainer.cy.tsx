import { MemoryRouter } from "react-router-dom"

import { HistoryStateContext } from "./state/HistoryStateContext"
import { HistoryContainer } from "./HistoryContainer"
import { HistoryState } from "./state/HistoryState"

const HISTORY_RESPONSE: HistoryType[] =[
  {
    id: 1,
    employee: `Ivanov Ivan`,
    borrowDate: `20.08.2025`,
    dueReturnDate: `23.08.2025`,
    actualReturnDate: `21.09.2025`,
    readingProgress: `Finished`,
  },
]

describe(`HistoryContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `*/books/history/1`,
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

    cy.contains(`20.08.2025`)
    
    cy.contains(`23.08.2025`)

    cy.contains(`21.09.2025`)
    
    cy.contains(`Finished`)
  })
}

function mountComponent() {
  const historyState = new HistoryState()

  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/books/history/1`,
        ]}>
        <HistoryStateContext.Provider value={historyState}>
          <HistoryContainer />
        </HistoryStateContext.Provider>
      </MemoryRouter>,
    )
}
