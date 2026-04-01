import { Language } from '../../../common/enums/language'
import { ProgressOfReading } from '../../../common/enums/progressOfReading'
import { BookState } from './BookState'

describe(`BookState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Book Data`, bookDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTest)
  describe(`Feedback`, feedbackTests)
})

function initializationTests() {
  const bookState = new BookState()
  
  it(`
  GIVEN a BookState
  WHEN initialize
  SHOULD have default book values
  `, () => {
    expect(bookState.book.id).to.eq(1)
    expect(bookState.book.title).to.eq(``)
    expect(bookState.book.annotation).to.eq(``)
    expect(bookState.book.language).to.eq(Language.RU)
    expect(bookState.book.authors).to.deep.eq([
      {
        fullName: ``, 
      },
    ])
    expect(bookState.book.coverUrl).to.eq(``)
    expect(bookState.book.bookCopiesIds).to.deep.eq([])
    expect(bookState.book.knowledgeAreasIds).to.deep.eq([])
  })
}

function bookDataTests() {
  let bookState: BookState

  const bookForInitialization: BookType = {
    id: 1,
    title: `Разработка ценностных предложений`,
    annotation: `Аннотация`,
    language: Language.RU,
    authors: [
      {
        fullName: `Алекс Остервальдер`,
      },
    ],
    coverUrl: `https://book.jpg`,
    bookCopiesIds: [
      1,
      2,
    ],
    employeesWhoReadNow: [
      {
        employeeId: 1,
        fullName: `Ceo Ceo Ceo`,
        bookCopyId: 1,
      },
    ],
    knowledgeAreasIds: [
      1,
    ],
  }
  
  beforeEach(() => {
    bookState = new BookState()

    bookState.initializeBook({
      loadedBook: bookForInitialization,
    })
  })

  it(`
  GIVEN the BookState
  WHEN set book data
  SHOULD display new values in the book object
  `, () => {
    expect(bookState.book).to.deep.eq(bookForInitialization)
  })

  it(`
  GIVEN the BookState
  WHEN book data is set
  AND called get count function
  SHOULD return correct count value
  `, () => {
    expect(bookState.count).to.eq(2)
  })
}
function feedbackTests() {
  let bookState: BookState

  const feedbackMock: Feedback[] = [
    {
      id: 1,
      employeeFullName: `Иван Иванов`,
      leftFeedbackAtUtc: `2026-03-31T06:40:55.347457Z`,
      progressOfReading: ProgressOfReading.ReadEntirely,
      rating: 5,
      advantages: `Очень полезная книга`,
      disadvantages: ``,
    },
    {
      id: 2,
      employeeFullName: `Петр Петров`,
      leftFeedbackAtUtc: `2026-03-31T06:40:55.347457Z`,
      progressOfReading: ProgressOfReading.ReadPartially,
      rating: 4,
      advantages: `Хорошие примеры`,
      disadvantages: `Много теории`,
    },
  ]

  beforeEach(() => {
    bookState = new BookState()
  })

  it(`
  GIVEN initial BookState
  WHEN not initialized feedback
  SHOULD have empty feedback array
  `, () => {
    expect(bookState.feedback).to.deep.eq([])
  })

  it(`
  GIVEN BookState
  WHEN initializeFeedback is called
  SHOULD set feedback correctly
  `, () => {
    bookState.initializeFeedback({
      loadedFeedback: feedbackMock,
    })

    expect(bookState.feedback).to.deep.eq(feedbackMock)
  })

  it(`
  GIVEN BookState with initialized feedback
  WHEN accessing feedback getter
  SHOULD return actual feedback data
  `, () => {
    bookState.initializeFeedback({
      loadedFeedback: feedbackMock,
    })

    const result = bookState.feedback

    expect(result).to.have.length(2)
    expect(result[0].employeeFullName).to.eq(`Иван Иванов`)
    expect(result[0].advantages).to.eq(`Очень полезная книга`)
    expect(result[1].progressOfReading).to.eq(ProgressOfReading.ReadPartially)
    expect(result[1].rating).to.eq(4)
  })
}

function isTriedToSubmitTest() {
  const bookState = new BookState()

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN setIsTriedToSubmit()
  SHOULD change value to true
  WHEN resetIsTriedToSubmit()
  SHOULD change value to false
  `, () => {
    expect(bookState.isTriedToSubmit).to.be.false

    bookState.setIsTriedToSubmit()
    expect(bookState.isTriedToSubmit).to.be.true

    bookState.resetIsTriedToSubmit()
    expect(bookState.isTriedToSubmit).to.be.false
  })
}