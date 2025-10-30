import { Language } from '../../../common/enums/language'
import { BookState } from './BookState'

describe(`BookState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Book Data`, bookDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTest)
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
  })
}

function bookDataTests() {
  let bookState: BookState

  const bookForInitialization = {
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
  }
  
  beforeEach(() => {
    bookState = new BookState()

    bookState.initialize({
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