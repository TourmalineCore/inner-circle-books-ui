import { ReturnBookState } from './ReturnBookState'

describe(`ReturnBookState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Return Book Data`, returnBookDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTest)
})

function initializationTests() {
  const returnBookState = new ReturnBookState()
  
  it(`
  GIVEN a ReturnBookState
  WHEN initialize
  SHOULD have default returnBook values
  `, () => {
    expect(returnBookState.book)
      .to
      .deep
      .eq({
        title: ``,
        coverUrl: ``,
        progressOfReading: ``,
        rating: 0,
        advantages: ``,
        disadvantages: ``,
      })
  })
}

function returnBookDataTests() {
  const returnBookState = new ReturnBookState()

  returnBookState.initialize({
    loadedBook: {
      id: 1,
      title: `Разработка ценностных предложений`,
      coverUrl: `https://returnbook.jpg`, 
    },
  })

  it(`
  GIVEN the ReturnBookState
  WHEN set returnBook data
  SHOULD display new values in the returnBook object
  `, () => {
    expect(returnBookState.book.id).to.eq(1)
    expect(returnBookState.book.title).to.eq(`Разработка ценностных предложений`)
    expect(returnBookState.book.coverUrl).to.eq(`https://returnbook.jpg`)
  })
}

function isTriedToSubmitTest() {
  const returnBookState = new ReturnBookState()

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN setIsTriedToSubmit()
  SHOULD change value to true
  WHEN resetIsTriedToSubmit()
  SHOULD change value to false
  `, () => {
    expect(returnBookState.isTriedToSubmit).to.be.false

    returnBookState.setIsTriedToSubmit()
    expect(returnBookState.isTriedToSubmit).to.be.true

    returnBookState.resetIsTriedToSubmit()
    expect(returnBookState.isTriedToSubmit).to.be.false
  })
}