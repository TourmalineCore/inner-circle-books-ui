import { HistoryState } from './HistoryState'

describe(`HistoryState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`History Data`, historyDataTests)
})

const HISTORY = [
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