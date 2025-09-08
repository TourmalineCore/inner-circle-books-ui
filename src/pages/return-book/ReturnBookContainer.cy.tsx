import { MemoryRouter } from "react-router-dom"
import { ReturnBookContainer } from "./ReturnBookContainer"
import { ReturnBookState } from "./state/ReturnBookState"
import { ReturnBookStateContext } from "./state/ReturnBookStateStateContext"

const RETURNBOOK_RESPONSE = {
  id: 1,
  title: `Разработка ценностных предложений`,
  coverUrl: ``,
}

describe(`ReturnBookContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `*/books/1`,
      RETURNBOOK_RESPONSE,
    )

    cy.viewport(1024, 768)
  })

  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN returnbook data from network
  WHEN render the component
  SHOULD see it
  `, () => {
    mountComponent()

    cy.contains(`Разработка ценностных предложений`)
  })
}

function mountComponent() {
  const returnbookState = new ReturnBookState()

  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/returnbooks/1`,
        ]}>
        <ReturnBookStateContext.Provider value={returnbookState}>
          <ReturnBookContainer goToBookPage={() => {}}/>
        </ReturnBookStateContext.Provider>
      </MemoryRouter>,
    )
}
