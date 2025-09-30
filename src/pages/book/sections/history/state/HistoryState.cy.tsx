import { HistoryState } from './HistoryState'

describe(`HistoryState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`History Data`, historyDataTests)
})

const HISTORY = [
  {
    id: 1,
    employee: `Ivanov Ivan`,
    borrowDate: new Date(`2025-08-30`),
    dueReturnDate: new Date(`2025-09-30`),
    actualReturnDate: new Date(`2025-09-21`),
    status: `Returned on time`,
    readingProgress: `Finished`,
  },
]

function initializationTests() {
  const historyState = new HistoryState()
  
  it(`
  GIVEN a HistoryState
  WHEN initialize
  SHOULD have default history value
  `, () => {
    expect(historyState.history)
      .to
      .deep
      .eq([])
  })
}

function historyDataTests() {
  let historyState: HistoryState
  
  beforeEach(() => {
    historyState = new HistoryState()

    historyState.initialize({
      loadedHistory: HISTORY,
    })
  })

  it(`
  GIVEN the HistoryState
  WHEN set history data
  SHOULD display new values in the history
  `, () => {
    expect(historyState.history).to.deep.eq(HISTORY)
  })
}