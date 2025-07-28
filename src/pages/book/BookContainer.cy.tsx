import { MemoryRouter } from "react-router-dom"
import { BookContainer } from "./BookContainer"
import { BookState } from "./state/BookState"
import { BookStateContext } from "./state/BookStateStateContext"

const BOOK_RESPONSE: BookType = {
  id: 1,
  title: `Разработка ценностных предложений`,
  annotation: `Аннотация`,
  language: `ru`,
  authors: [
    {
      fullName: `Алекс Остервальдер`,
    },
    {
      fullName: `Сергей Николенко`,
    },
  ],
  bookCoverUrl: ``,
  bookCopies: [
    {
      bookCopyId: 11,
    },
    {
      bookCopyId: 12,
    },
  ],
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

    cy.contains(`Разработка ценностных предложений`)
    cy.contains(`Аннотация`)
    cy.contains(`Russian`)
    cy.contains(`Алекс Остервальдер`)
    cy.contains(`Сергей Николенко`)
  })
}

function mountComponent() {
  const bookState = new BookState()

  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/books/1`,
        ]}>
        <BookStateContext.Provider value={bookState}>
          <BookContainer />
        </BookStateContext.Provider>
      </MemoryRouter>,
    )
}
