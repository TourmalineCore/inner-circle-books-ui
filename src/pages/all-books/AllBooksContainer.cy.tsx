import { AllBooksContainer } from "./AllBooksContainer"
import { AllBooksState } from "./state/AllBooksState"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"

const BOOK_CARDS_RESPONSE = {
  books: [
    {
      bookCoverUrl: ``,
      title: `Разработка ценностных предложений`,
      authors: [
        {
          fullName: `Алекс Остервальдер`,
        },
        {
          fullName: `Сергей Николенко`,
        },
      ],
      language: `ru`,
    },
    {
      bookCoverUrl: ``,
      title: `Думай медленно… решай быстро`,
      authors: [
        {
          fullName: `Даниэль Канеман`,
        },
      ],
      language: `en`,
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
    cy.contains(`Даниэль Канеман`)
    cy.contains(`en`)
  })
}

function mountComponent() {
  const allBooksState = new AllBooksState()

  cy
    .mount(
      <AllBooksStateContext.Provider value={allBooksState}>
        <AllBooksContainer />
      </AllBooksStateContext.Provider>,
    )
}
