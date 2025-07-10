import { BookContainer } from "./BookContainer"
import { BookState } from "./state/BookState"
import { BookStateContext } from "./state/BookStateStateContext"

const BOOK_RESPONSE = {
  id: 1,
  title: `Разработка ценностных предложений`,
  annotation: `annotation`,
  bookCoverUrl: `https://cdn.litres.ru/pub/c/cover/14363291.jpg`,
  authors: [
    {
      fullName: `Алекс Остервальдер`,
    },
    {
      fullName: `Сергей Николенко`,
    },
  ],
  language: `rus`,
}

describe(`BookContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `*/books/1`,
      BOOK_RESPONSE,
    )
  })

  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN book data from network
  WHEN render the component
  SHOULD see it
  `, () => {
    mountComponent()

    cy.contains(`Думай медленно… решай быстро`)
    cy.contains(`Даниэль Канеман`)
    cy.contains(`rus`)
    
    cy
      .get(`img[src="https://cdn.litres.ru/pub/c/cover/14363291.jpg"]`)
      .should(`exist`)
  })
}

function mountComponent() {
  const bookState = new BookState()

  cy
    .mount(
      <BookStateContext.Provider value={bookState}>
        <BookContainer />
      </BookStateContext.Provider>,
    )
}
