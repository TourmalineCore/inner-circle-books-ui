import { BookCardsContainer } from "./BookCardsContainer"
import { BookCardsState } from "./state/BookCardsState"
import { BookCardsStateContext } from "./state/BookCardsStateStateContext"

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
      language: `rus`,
    },
    {
      bookCoverUrl: ``,
      title: `Думай медленно… решай быстро`,
      authors: [
        {
          fullName: `Даниэль Канеман`,
        },
      ],
      language: `eng`,
    },
  ],
}

describe(`BookCardsContainer`, () => {
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
  GIVEN two bookCards from network
  WHEN render the component
  SHOULD see them
  `, () => {
    mountComponent()

    cy.contains(`Думай медленно… решай быстро`)
    cy.contains(`Разработка ценностных предложений`)
    cy.contains(`Даниэль Канеман`)
    cy.contains(`eng`)
  })
}

function mountComponent() {
  const bookCardsState = new BookCardsState()

  cy
    .mount(
      <BookCardsStateContext.Provider value={bookCardsState}>
        <BookCardsContainer />
      </BookCardsStateContext.Provider>,
    )
}
