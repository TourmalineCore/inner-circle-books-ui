import { MemoryRouter } from "react-router-dom"
import { BookContainer } from "./BookContainer"
import { BookState } from "./state/BookState"
import { BookStateContext } from "./state/BookStateStateContext"
import { authService } from "../../common/authService"
import { MOCK_TOKEN } from "../../common/constant"
import { Language } from "../../common/enums/language"

const BOOK_RESPONSE: BookType = {
  id: 1,
  title: `Разработка ценностных предложений`,
  annotation: `Аннотация`,
  language: Language.RU,
  authors: [
    {
      fullName: `Алекс Остервальдер`,
    },
    {
      fullName: `Сергей Николенко`,
    },
  ],
  coverUrl: ``,
  bookCopiesIds: [
    14,
    15,
  ],
  employeesWhoReadNow: [
    {
      employeeId: 2,
      fullName: `Иванов Иван`,
      bookCopyId: 14,
    },
    {
      employeeId: 3,
      fullName: `Петров Петр`,
      bookCopyId: 15,
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

    cy.viewport(1920, 1366)
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
    cy.contains(`Book Tracking`)
    cy.contains(`Иванов Иван`)
    cy.contains(`Петров Петр`)
  })
}

function mountComponent() {
  const bookState = new BookState()

  const mockAuthContext = [
    MOCK_TOKEN,
  ]
    
  cy
    .mount(
      <authService.AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter 
          initialEntries={[
            `/books/1`,
          ]}>
          <BookStateContext.Provider value={bookState}>
            <BookContainer openModalQrCode={() => {}}/>
          </BookStateContext.Provider>
        </MemoryRouter>
      </authService.AuthContext.Provider>,
    )
}
