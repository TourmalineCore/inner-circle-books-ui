import { ReturnBookState } from './ReturnBookState'

describe(`ReturnBookState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Return Book Data`, returnBookDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTest)
  describe(`Validation & Errors`, isErrorTest)
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

  it(`
  GIVEN the ReturnBookState
  WHEN setRating
  SHOULD update rating correctly
  `, () => {
    expect(returnBookState.isRatingValid).to.be.false

    returnBookState.setRating({
      rating: 5, 
    })

    expect(returnBookState.book.rating).to.eq(5)
    expect(returnBookState.isRatingValid).to.be.true
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

function isErrorTest() {
  let returnBookState: ReturnBookState

  beforeEach(() => {
    returnBookState = new ReturnBookState()
  })

  it(`
  GIVEN rating is not set
  WHEN form is submitted
  SHOULD show rating error
  `, () => {
    expect(returnBookState.errors.isRatingError).to.be.false

    returnBookState.setIsTriedToSubmit()

    expect(returnBookState.errors.isRatingError).to.be.true
  })

  it(`
  GIVEN rating is set
  WHEN checking isSomethingFilledWithinTheForm
  SHOULD return true
  `, () => {
    returnBookState.setRating({
      rating: 3, 
    })

    expect(returnBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN only progress is set
  WHEN checking isValid
  SHOULD return false
  AND when rating is also set SHOULD return true
  `, () => {
    returnBookState.setProgressOfReading({
      progressOfReading: `READ`, 
    })

    expect(returnBookState.isValid).to.be.false

    returnBookState.setRating({
      rating: 3, 
    })

    expect(returnBookState.isValid).to.be.true
  })
}