import { ProgressOfReading } from '../../../common/enums/progressOfReading'
import { EMPTY_BOOK_FEEDBACK, BookFeedbackState } from './BookFeedbackState'

describe(`BookFeedbackState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Setting data`, settingDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTests)
  describe(`Is Saving`, isSavingTests)
  describe(`Validation & Errors`, validationAndErrorTests)
  describe(`Is Feedback Disabled`, isFeedbackDisabledTests)
  describe(`Is Something Filled Within The Form`, isSomethingFilledWithinTheFormTests)
})

function initializationTests() {
  let bookFeedbackState: BookFeedbackState

  beforeEach(() => {
    bookFeedbackState = new BookFeedbackState()
  })
    
  it(`
  GIVEN a new BookFeedbackState
  WHEN initialized
  SHOULD have all default values: empty bookFeedback, false flags, and no errors
  `, () => {  
    expect(bookFeedbackState.bookFeedback)
      .to
      .deep
      .eq(EMPTY_BOOK_FEEDBACK)

    expect(bookFeedbackState.isTriedToSubmit).to.be.false
    expect(bookFeedbackState.isSaving).to.be.false
    
    expect(bookFeedbackState.errors.isRatingError).to.be.false
    expect(bookFeedbackState.errors.isProgressOfReadingError).to.be.false
    
    expect(bookFeedbackState.isRatingValid).to.be.false
    expect(bookFeedbackState.isProgressOfReadingValid).to.be.false
    expect(bookFeedbackState.isFeedbackDisabled).to.be.false
    expect(bookFeedbackState.isValid).to.be.false
  })
  
  it(`
  GIVEN a new BookFeedbackState
  WHEN initialize book
  SHOULD return initialized data 
  `, () => {
    bookFeedbackState.initializeBook({
      loadedBook: {
        title: `Разработка ценностных предложений`,
        coverUrl: `https://returnbook.jpg`, 
      },
    })
    
    expect(bookFeedbackState.book.title)
      .to
      .eq(`Разработка ценностных предложений`)

    expect(bookFeedbackState.book.coverUrl)
      .to
      .eq(`https://returnbook.jpg`)
  })
}

function settingDataTests() {
  let bookFeedbackState: BookFeedbackState

  beforeEach(() => {
    bookFeedbackState = new BookFeedbackState()
  })

  it(`
  GIVEN advantages is empty
  WHEN set advantages
  SHOULD advantages return the transmitted value
  `, () => {
    const advantagesText = `Advantages`

    bookFeedbackState.setAdvantages({
      advantages: advantagesText,
    })

    expect(bookFeedbackState.bookFeedback.advantages)
      .to
      .eq(advantagesText)
  })

  it(`
  GIVEN disadvantages is empty
  WHEN set disadvantages
  SHOULD disadvantages return the transmitted value
  `, () => {
    const disadvantagesText = `Disadvantages`

    bookFeedbackState.setDisadvantages({
      disadvantages: disadvantagesText,
    })

    expect(bookFeedbackState.bookFeedback.disadvantages)
      .to
      .eq(disadvantagesText)
  })
}

function isTriedToSubmitTests() {
  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN call setIsTriedToSubmit()
  AND after call resetIsTriedToSubmit()
  SHOULD isTriedToSubmit change to true and then to false
  `, () => {
    const bookFeedbackState = new BookFeedbackState()

    bookFeedbackState.setIsTriedToSubmit()
    expect(bookFeedbackState.isTriedToSubmit).to.be.true

    bookFeedbackState.resetIsTriedToSubmit()
    expect(bookFeedbackState.isTriedToSubmit).to.be.false
  })
}

function isSavingTests() {
  it(`
  GIVEN initial isSaving = false
  WHEN call setIsSaving()
  AND after call resetIsSaving()
  SHOULD isSaving change to true and then to false
  `, () => {
    const bookFeedbackState = new BookFeedbackState()
  
    bookFeedbackState.setIsSaving()
    expect(bookFeedbackState.isSaving).to.be.true

    bookFeedbackState.resetIsSaving()
    expect(bookFeedbackState.isSaving).to.be.false
  })
}

function validationAndErrorTests() {
  let bookFeedbackState: BookFeedbackState

  beforeEach(() => {
    bookFeedbackState = new BookFeedbackState()
  })

  it(`
  GIVEN rating is not set
  WHEN form is submitted
  THEN isRatingError return true
  AND isRatingValid return false
  `, () => {
    bookFeedbackState.setIsTriedToSubmit()

    expect(bookFeedbackState.errors.isRatingError).to.be.true

    expect(bookFeedbackState.isRatingValid).to.be.false
  })

  it(`
  GIVEN rating is set
  WHEN form is submitted
  THEN isRatingError return false
  AND isRatingValid return true
  `, () => {
    bookFeedbackState.setRating({
      rating: 3, 
    })

    bookFeedbackState.setIsTriedToSubmit()

    expect(bookFeedbackState.errors.isRatingError).to.be.false

    expect(bookFeedbackState.isRatingValid).to.be.true
  })

  it(`
  GIVEN progressOfReading is not set
  WHEN form is submitted
  THEN isProgressOfReadingError return true
  AND isProgressOfReadingValid return false
  `, () => {
    bookFeedbackState.setIsTriedToSubmit()

    expect(bookFeedbackState.errors.isProgressOfReadingError).to.be.true

    expect(bookFeedbackState.isProgressOfReadingValid).to.be.false
  })

  it(`
  GIVEN progressOfReading is set
  WHEN form is submitted
  THEN isProgressOfReadingError return false
  AND isProgressOfReadingValid return true
  `, () => {
    bookFeedbackState.setProgressOfReading({
      progressOfReading: ProgressOfReading.ReadEntirely, 
    })

    bookFeedbackState.setIsTriedToSubmit()

    expect(bookFeedbackState.errors.isProgressOfReadingError).to.be.false

    expect(bookFeedbackState.isProgressOfReadingValid).to.be.true
  })

  it(`
  GIVEN rating and progressOfReading is set
  WHEN form is submitted
  THEN isValid return true
  `, () => {
    bookFeedbackState.setRating({
      rating: 2, 
    })

    bookFeedbackState.setProgressOfReading({
      progressOfReading: ProgressOfReading.ReadEntirely, 
    })

    bookFeedbackState.setIsTriedToSubmit()

    expect(bookFeedbackState.isValid).to.be.true
  })

  it(`
  GIVEN progressOfReading is NotReadAtAll
  AND rating is not set
  WHEN form is submitted
  THEN isRatingError return false
  `, () => {
    bookFeedbackState.setProgressOfReading({
      progressOfReading: ProgressOfReading.NotReadAtAll,
    })

    bookFeedbackState.setIsTriedToSubmit()

    expect(bookFeedbackState.errors.isRatingError).to.be.false
  })
}

function isFeedbackDisabledTests() {
  let bookFeedbackState: BookFeedbackState

  beforeEach(() => {
    bookFeedbackState = new BookFeedbackState()
  })
  
  it(`
  GIVEN progressOfReading is empty
  WHEN set ProgressOfReading equal NotReadAtAll
  THEN isFeedbackDisabled return true
  `, () => {
    bookFeedbackState.setProgressOfReading({
      progressOfReading: ProgressOfReading.NotReadAtAll,
    })

    expect(bookFeedbackState.isFeedbackDisabled).to.be.true
  })

  it(`
  GIVEN progressOfReading is empty
  WHEN set ProgressOfReading equal ReadEntirely
  THEN isFeedbackDisabled return false
  `, () => {
    bookFeedbackState.setProgressOfReading({
      progressOfReading: ProgressOfReading.ReadEntirely,
    })

    expect(bookFeedbackState.isFeedbackDisabled).to.be.false
  })
}

function isSomethingFilledWithinTheFormTests() {
  let bookFeedbackState: BookFeedbackState

  beforeEach(() => {
    bookFeedbackState = new BookFeedbackState()
  })
  
  it(`
  GIVEN rating and progressOfReading is not set
  WHEN checking isSomethingFilledWithinTheForm
  SHOULD return false
  `, () => {
    expect(bookFeedbackState.isSomethingFilledWithinTheForm()).to.be.false
  })

  it(`
  GIVEN rating is set
  AND progressOfReading is not set
  WHEN checking isSomethingFilledWithinTheForm
  SHOULD return true
  `, () => {
    bookFeedbackState.setRating({
      rating: 3, 
    })

    expect(bookFeedbackState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN progressOfReading is set
  AND rating is not set
  WHEN checking isSomethingFilledWithinTheForm
  SHOULD return true
  `, () => {
    bookFeedbackState.setProgressOfReading({
      progressOfReading: ProgressOfReading.ReadEntirely, 
    })

    expect(bookFeedbackState.isSomethingFilledWithinTheForm()).to.be.true
  })
}