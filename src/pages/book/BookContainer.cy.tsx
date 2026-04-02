import { MemoryRouter } from "react-router-dom"
import { BookContainer } from "./BookContainer"
import { BookState } from "./state/BookState"
import { BookStateContext } from "./state/BookStateStateContext"
import { authService } from "../../common/authService"
import { MOCK_TOKEN } from "../../common/constant"
import { Language } from "../../common/enums/language"
import { ProgressOfReading } from "../../common/enums/progressOfReading"

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
  knowledgeAreasIds: [
    1,
  ],
}

const FEEDBACK_RESPONSE: FeedbackResponse = {
  bookFeedback: [
    {
      id: 1,
      employeeFullName: `Иван Иванов`,
      leftFeedbackAtUtc: new Date(`2026-03-31`),
      progressOfReading: ProgressOfReading.ReadEntirely,
      rating: 5,
      advantages: `Очень полезная книга`,
      disadvantages: ``,
    },
    {
      id: 2,
      employeeFullName: `Петр Петров`,
      leftFeedbackAtUtc: new Date(`2026-03-31`),
      progressOfReading: ProgressOfReading.ReadPartially,
      rating: 4,
      advantages: `Хорошие примеры`,
      disadvantages: `Много теории`,
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

    cy.intercept(
      `GET`,
      `*/books/feedback/1`,
      FEEDBACK_RESPONSE,
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
    cy.contains(`Feedback`)

    cy.getByData(`feedback-card-date`)
      .first()
      .contains(`2026-03-31`)
      
    cy
      .getByData(`feedback-card`)
      .should(`have.length`, 2)

    cy.contains(`Иван Иванов`)
    cy.contains(`Очень полезная книга`)

    cy.contains(`Петр Петров`)
    cy.contains(`Хорошие примеры`)
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
