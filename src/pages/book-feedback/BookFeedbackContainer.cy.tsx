import { MemoryRouter } from "react-router-dom"
import { BookFeedbackContainer } from "./BookFeedbackContainer"
import { BookFeedbackState } from "./state/BookFeedbackState"
import { BookFeedbackStateContext } from "./state/BookFeedbackStateContext"
import { ProgressOfReading } from "../../common/enums/progressOfReading"

const BOOK_RESPONSE = {
  id: 1,
  title: `Разработка ценностных предложений`,
  coverUrl: ``,
}

describe(`BookFeedbackContainer`, () => {
  describe(`Load book data`, loadBookDataTests)
  describe(`Leave book feedback`, leaveBookFeedbackTests)
})

function loadBookDataTests() {
  it(`
  GIVEN book feedback page
  WHEN render the component
  THEN make complete network call with the bookId in url to load book
  `, () => {
    cy.intercept(
      `GET`,
      `*/books/1`,
      BOOK_RESPONSE,
    )
      .as(`load-book`)

    mountComponent()

    cy.wait(`@load-book`)
  })
}

function leaveBookFeedbackTests() {
  it(`
  GIVEN opened book feedback page
  WHEN user filled all field
  AND click submit button
  THEN make complete network call with the bookId in url to leave book feedback
  `, () => {
    cy.intercept(
      `POST`,
      `*/books/1/feedback`,
      {
        statusCode: 200,
      },
    )
      .as(`add-book-feedback`)
    
    mountComponent()

    cy
      .get(`.book-feedback-form__progress-options > :nth-child(2)`)
      .click()

    cy
      .get(`.rating > :nth-child(4)`)
      .click()

    cy
      .getByData(`book-feedback-form-advantages`)
      .type(`Good book`)
    
    cy
      .getByData(`book-feedback-form-disadvantages`)
      .type(`Not observed`)

    cy
      .getByData(`book-feedback-submit-button`)
      .click()

    cy.get(`@add-book-feedback`)
      .its(`request.body`)
      .should(`deep.equal`, {
        advantages: `Good book`,
        disadvantages: `Not observed`,
        progressOfReading: ProgressOfReading.ReadEntirely,
        rating: 4,
      })
  })
}

function mountComponent() {
  const bookFeedbackState = new BookFeedbackState()

  cy.viewport(1366, 750)
  
  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/books/1/feedback`,
        ]}>
        <BookFeedbackStateContext.Provider value={bookFeedbackState}>
          <BookFeedbackContainer /> 
        </BookFeedbackStateContext.Provider>
      </MemoryRouter>,
    )
}