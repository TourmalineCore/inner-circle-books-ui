import { BookHistoryState } from './BookHistoryState'

describe(`BookHistoryState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Book History Data`, bookHistoryDataTests)
})

const BOOK_HISTORY = [
  {
    id: 1,
    employee: `Ivanov Ivan`,
    borrowDate: `30.08.2025`,
    dueReturnDate: `30.09.2025`,
    actualReturnDate: `21.09.2025`,
    readingProgress: `Finished`,
  },
]

function initializationTests() {
  const bookHistoryState = new BookHistoryState()
  
  it(`
  GIVEN a BookHistoryState
  WHEN initialize
  SHOULD have default history value
  `, () => {
    expect(bookHistoryState.bookHistory)
      .to
      .deep
      .eq([])
  })
}

function bookHistoryDataTests() {
  let bookHistoryState: BookHistoryState
  
  beforeEach(() => {
    bookHistoryState = new BookHistoryState()

    bookHistoryState.initialize({
      loadedBookHistory: BOOK_HISTORY,
    })
  })

  it(`
  GIVEN the BookHistoryState
  WHEN set book history data
  SHOULD display new values in the book history
  `, () => {
    expect(bookHistoryState.bookHistory)
      .to
      .deep
      .eq(BOOK_HISTORY)
  })
}