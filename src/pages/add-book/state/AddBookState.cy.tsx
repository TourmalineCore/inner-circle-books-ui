import { Language } from '../../../common/enums/language'
import { AddBookState } from './AddBookState'

describe(`AddBookState`, () => {
  describe(`Initialization`, initializationTest)
  describe(`Setters`, settersTests)
  describe(`Reset`, resetTest)
  describe(`Validation`, validationTests)
  describe(`Something filled with in the form`, somethingFilledWithinTheFormTests)
  describe(`Saving flag`, savingTest)
})

function initializationTest() {
  const addBookState = new AddBookState()

  it(`
  GIVEN a new AddBookState
  WHEN initialize
  SHOULD have default book values
  `, () => {
    checkExpectedInitialState({
      addBookState,
    })
  })
}

function settersTests() {
  let addBookState: AddBookState

  beforeEach(() => {
    addBookState = new AddBookState()
  })

  it(`
  GIVEN a new AddBookState
  WHEN book data is set
  SHOULD display new values in the book object
  `, () => {
    setBookData({
      addBookState,
    })

    expect(addBookState.book.title).to.eq(`Разработка ценностных предложений`)
    expect(addBookState.book.annotation).to.eq(`Аннотация`)
    expect(addBookState.book.countOfCopies).to.eq(3)
    expect(addBookState.book.language).to.eq(Language.EN)
    expect(addBookState.book.authors).to.deep.eq([
      {
        fullName: `Алекс Остервальдер`, 
      },
    ])
    expect(addBookState.book.coverUrl).to.eq(`https://book.jpg`)
  })

  it(`
  GIVEN a book with one author
  WHEN addAuthor is called
  SHOULD append a new empty author
  `, () => {
    addBookState.addAuthor()
      
    expect(addBookState.book.authors).to.deep.eq([
      {
        fullName: ``,
      },
      {
        fullName: ``,
      },
    ])
  })

  it(`
  GIVEN a book with two authors
  WHEN removeAuthor is called with index 0
  SHOULD remove the first author
  `, () => {
    addBookState.book.authors[0].fullName = `Алекс Остервальдер`
    addBookState.addAuthor()
    addBookState.book.authors[1].fullName = `Сергей Николенко`
    addBookState.removeAuthor({
      index: 0,
    })

    expect(addBookState.book.authors).to.deep.eq([
      {
        fullName: `Сергей Николенко`,
      },
    ])
  })
}

function resetTest() {
  const addBookState = new AddBookState()

  it(`
  GIVEN a filled form
  WHEN reset is called
  SHOULD reset book data to default values
  `, () => {      
    setBookData({
      addBookState,
    })

    addBookState.reset()

    checkExpectedInitialState({
      addBookState,
    })
  })
}

function validationTests() {
  let addBookState: AddBookState

  beforeEach(() => {
    addBookState = new AddBookState()
  })
  
  it(`
  GIVEN an empty title
  WHEN isValid is accessed
  SHOULD return false and set title error to true
  `, () => {
    addBookState.setAnnotation({
      annotation: `Аннотация`,
    })
    addBookState.setAuthor({
      index: 0,
      authorFullName: `Алекс Остервальдер`,
    })

    addBookState.setIsTriedToSubmit()

    expect(addBookState.isValid).to.be.false
    expect(addBookState.errors.isTitleError).to.be.true
    expect(addBookState.errors.isAnnotationError).to.be.false
    expect(addBookState.errors.isAuthorsError).to.be.false
  })

  it(`
  GIVEN an empty annotation
  WHEN isValid is accessed
  SHOULD return false and set annotation error to true
  `, () => {
    addBookState.setTitle({
      title: `Разработка ценностных предложений`,
    })
    addBookState.setAuthor({
      index: 0,
      authorFullName: `Алекс Остервальдер`,
    })

    addBookState.setIsTriedToSubmit()

    expect(addBookState.isValid).to.be.false
    expect(addBookState.errors.isAnnotationError).to.be.true
  })

  it(`
  GIVEN all authors are empty
  WHEN isValid is accessed
  SHOULD return false and set authors error to true
  `, () => {
    addBookState.setTitle({
      title: `Разработка ценностных предложений`,
    })
    addBookState.setAnnotation({
      annotation: `Аннотация`,
    })
    addBookState.addAuthor

    addBookState.setIsTriedToSubmit()

    expect(addBookState.isValid).to.be.false
    expect(addBookState.errors.isAuthorsError).to.be.true
  })

  it(`
  GIVEN valid title, annotation, and author
  WHEN isValid is accessed
  SHOULD return true and all errors should be false
  `, () => {
    addBookState.setTitle({
      title: `Разработка ценностных предложений`,
    })
    addBookState.setAnnotation({
      annotation: `Аннотация`,
    })
    addBookState.setAuthor({
      index: 0,
      authorFullName: `Алекс Остервальдер`,
    })
    
    addBookState.setIsTriedToSubmit()

    expect(addBookState.isValid).to.be.true
    expect(addBookState.errors).to.deep.equal({
      isTitleError: false,
      isAnnotationError: false,
      isAuthorsError: false,
    })
  })
}

function somethingFilledWithinTheFormTests() {
  let addBookState: AddBookState

  beforeEach(() => {
    addBookState = new AddBookState()
  })
  
  it(`
  GIVEN a new instance
  WHEN no fields are modified
  SHOULD return false for isSomethingFilledWithinTheForm
  `, () => {
    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.false
  })

  it(`
  GIVEN a new instance
  WHEN title was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    addBookState.setTitle({
      title: `Разработка ценностных предложений`,
    })

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN countOfCopies was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    addBookState.setCount({
      countOfCopies: 3,
    })

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN annotation was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    addBookState.setAnnotation({
      annotation: `Аннотация`,
    })

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN author was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    addBookState.setAuthor({
      index: 0,
      authorFullName: `Алекс Остервальдер`,
    })

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN coverUrl was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    addBookState.setCoverUrl({
      coverUrl: `https://book.jpg`,
    })
      
    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })
}

function savingTest() {
  let addBookState: AddBookState

  beforeEach(() => {
    addBookState = new AddBookState()
  })
  
  it(`
  GIVEN initial isSaving = false
  WHEN setIsSaving and resetIsSaving are triggered
  SHOULD toggle isSaving to true and then back to false
  `, () => {
    expect(addBookState.isSaving).to.be.false

    addBookState.setIsSaving()
    expect(addBookState.isSaving).to.be.true
    
    addBookState.resetIsSaving()
    expect(addBookState.isSaving).to.be.false
  })

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN setIsTriedToSubmit()
  SHOULD change value to true
  WHEN resetIsTriedToSubmit()
  SHOULD change value to false
  `, () => {
    expect(addBookState.isTriedToSubmit).to.be.false

    addBookState.setIsTriedToSubmit()
    expect(addBookState.isTriedToSubmit).to.be.true

    addBookState.resetIsTriedToSubmit()
    expect(addBookState.isTriedToSubmit).to.be.false
  })
}

function checkExpectedInitialState({
  addBookState, 
}: { 
  addBookState: AddBookState, 
}) {
  expect(addBookState.book.title).to.eq(``)
  expect(addBookState.book.annotation).to.eq(``)
  expect(addBookState.book.countOfCopies).to.eq(1)
  expect(addBookState.book.language).to.eq(Language.RU)
  expect(addBookState.book.authors).to.deep.eq([
    {
      fullName: ``, 
    },
  ])
  expect(addBookState.book.coverUrl).to.eq(``)
}

function setBookData({
  addBookState,
}: {
  addBookState: AddBookState,
}) {
  addBookState.setTitle({
    title: `Разработка ценностных предложений`,
  })
  addBookState.setAnnotation({
    annotation: `Аннотация`,
  })
  addBookState.setCount({
    countOfCopies: 3,
  })
  addBookState.setLanguage({
    language: Language.EN,
  })
  addBookState.setAuthor({
    index: 0,
    authorFullName: `Алекс Остервальдер`,
  })
  addBookState.setCoverUrl({
    coverUrl: `https://book.jpg`,
  })
}