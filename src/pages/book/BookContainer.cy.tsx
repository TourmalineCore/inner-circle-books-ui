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
  coverUrl: ``,
  bookCopies: [
    {
      bookCopyId: 14,
      copyNumber: 1,
    },
    {
      bookCopyId: 15,
      copyNumber: 2,
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

    cy.viewport(1024, 768)
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
    cy.contains(`2`)
  })

  it(`
  GIVEN book data from network
  WHEN the "View QR Code" button is clicked
  SHOULD open the overlay modal
  `, () => {
    mountComponent()

    cy.contains(`View QR Code`)
      .click()

    cy.getByData(`modal-qr-form`)
      .should(`be.visible`)
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
