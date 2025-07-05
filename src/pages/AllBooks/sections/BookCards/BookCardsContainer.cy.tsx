import { BookCardsContainer } from "./BookCardsContainer"
import { BookCardsState } from "./state/BookCardsState"
import { BookCardsStateContext } from "./state/BookCardsStateStateContext"

const BOOK_CARDS_RESPONSE = {
  books: [
    {
      bookCoverUrl: `https://cdn.litres.ru/pub/c/cover/14363291.jpg`,
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
      bookCoverUrl: `https://cdn.litres.ru/pub/c/cover/14363291.jpg`,
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
    cy.contains(`Даниэль Канеман`)
    cy.contains(`eng`)
    
    cy
      .get(`img[src="https://cdn.litres.ru/pub/c/cover/14363291.jpg"]`)
      .should(`exist`)
  })
}

function mountComponent() {
  const bookCardsState = new BookCardsState()

  cy
    .wrap(bookCardsState)
    .as(`toDosState`)

  cy
    .mount(
      <BookCardsStateContext.Provider value={bookCardsState}>
        <BookCardsContainer/>
      </BookCardsStateContext.Provider>,
    )
}
