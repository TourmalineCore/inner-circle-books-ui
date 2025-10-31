import { ReturnBookState } from './ReturnBookState'

describe(`ReturnBookState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Return Book Data`, returnBookDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTest)
})

function initializationTests() {
  const returnbookState = new ReturnBookState()
  
  it(`
  GIVEN a ReturnBookState
  WHEN initialize
  SHOULD have default returnbook values
  `, () => {
    expect(returnbookState.book.id).to.eq(1)
    expect(returnbookState.book.title).to.eq(``)
    expect(returnbookState.book.coverUrl).to.eq(``)
  })
}

function returnBookDataTests() {
  const returnbookState = new ReturnBookState()

  returnbookState.initialize({
    loadedBook: {
      id: 1,
      title: `Разработка ценностных предложений`,
      coverUrl: `https://returnbook.jpg`,
        
    },
  })

  it(`
  GIVEN the ReturnBookState
  WHEN set returnbook data
  SHOULD display new values in the returnbook object
  `, () => {
    expect(returnbookState.book.id).to.eq(1)
    expect(returnbookState.book.title).to.eq(`Разработка ценностных предложений`)
    expect(returnbookState.book.coverUrl).to.eq(`https://returnbook.jpg`)
  })
}

function isTriedToSubmitTest() {
  const returnbookState = new ReturnBookState()

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN setIsTriedToSubmit()
  SHOULD change value to true
  WHEN resetIsTriedToSubmit()
  SHOULD change value to false
  `, () => {
    expect(returnbookState.isTriedToSubmit).to.be.false

    returnbookState.setIsTriedToSubmit()
    expect(returnbookState.isTriedToSubmit).to.be.true

    returnbookState.resetIsTriedToSubmit()
    expect(returnbookState.isTriedToSubmit).to.be.false
  })
}