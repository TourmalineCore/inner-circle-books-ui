import React from "react"
import { authService } from "../../common/authService"
import { AllBooksContainer } from "./AllBooksContainer"
import { AllBooksState } from "./state/AllBooksState"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import { MOCK_TOKEN } from "../../common/constant"

const BOOK_CARDS_RESPONSE = {
  books: [
    {
      title: `Разработка ценностных предложений`,
      language: `ru`,
      authors: [
        {
          fullName: `Алекс Остервальдер`,
        },
        {
          fullName: `Сергей Николенко`,
        },
      ],
      coverUrl: ``,
    },
    {
      title: `Думай медленно… решай быстро`,
      language: `en`,
      authors: [
        {
          fullName: `Даниэль Канеман`,
        },
      ],
      coverUrl: ``,
    },
  ],
}

describe(`AllBooksContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `*/books`,
      BOOK_CARDS_RESPONSE,
    )

    cy.stub(React, `useContext`)
      .withArgs(authService.AuthContext)
      .returns([
        MOCK_TOKEN,
      ])
  })

  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN two book cards from network
  WHEN render the component
  SHOULD see them
  `, () => {
    mountComponent()

    cy.contains(`Думай медленно… решай быстро`)
    cy.contains(`Разработка ценностных предложений`)
    cy.contains(`en`)
    cy.contains(`Даниэль Канеман`)
  })
}

function mountComponent() {
  const allBooksState = new AllBooksState()

  const mockAuthContext = [
    MOCK_TOKEN,
  ]
  
  cy
    .mount(
      <authService.AuthContext.Provider value={mockAuthContext}>
        <AllBooksStateContext.Provider value={allBooksState}>
          <AllBooksContainer />
        </AllBooksStateContext.Provider>
      </authService.AuthContext.Provider>,
    )
}
