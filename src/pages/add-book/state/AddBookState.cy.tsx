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
  it(`
  GIVEN a new AddBookState
  WHEN initialize
  SHOULD have default book values
  `, () => {
    const addBookState = new AddBookState()

    checkExpectedInitialState({
      addBookState,
    })
  })
}

function settersTests() {
  it(`
  GIVEN a new AddBookState
  WHEN book data is set
  SHOULD reflect new values in the book object
  `, () => {
    const addBookState = new AddBookState()

    setBookData({
      addBookState,
    })

    expect(addBookState.book.title).to.eq(`Title`)
    expect(addBookState.book.count).to.eq(3)
    expect(addBookState.book.language).to.eq(`en`)
    expect(addBookState.book.annotation).to.eq(`Annotation`)
    expect(addBookState.book.authors).to.deep.eq([
      {
        fullName: `Author`, 
      },
    ])
    expect(addBookState.book.bookCoverUrl).to.eq(`http://image.com`)
  })

  it(`
  GIVEN a book with one author
  WHEN addAuthor is called
  SHOULD append a new empty author
  `, () => {
    const addBookState = new AddBookState()

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
    const addBookState = new AddBookState()

    addBookState.book.authors[0].fullName = `First`
    addBookState.addAuthor()
    addBookState.book.authors[1].fullName = `Second`
    addBookState.removeAuthor({
      index: 0,
    })

    expect(addBookState.book.authors).to.deep.eq([
      {
        fullName: `Second`,
      },
    ])
  })
}

function resetTest() {
  it(`
  GIVEN a filled form
  WHEN reset is called
  SHOULD reset book data to default values
  `, () => {
    const addBookState = new AddBookState()
      
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
  it(`
  GIVEN an empty title
  WHEN isValid is accessed
  SHOULD return false and set title error to true
  `, () => {
    const addBookState = new AddBookState()

    addBookState.setAnnotation({
      annotation: `Annotation`,
    })
    addBookState.setAuthor({
      index: 0,
      authorFullName: `Author`,
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
    const addBookState = new AddBookState()

    addBookState.setTitle({
      title: `Title`,
    })
    addBookState.setAuthor({
      index: 0,
      authorFullName: `Author`,
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
    const addBookState = new AddBookState()

    addBookState.setTitle({
      title: `Title`,
    })
    addBookState.setAnnotation({
      annotation: `Annotation`,
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
    const addBookState = new AddBookState()

    addBookState.setTitle({
      title: `Title`,
    })
    addBookState.setAnnotation({
      annotation: `Annotation`,
    })
    addBookState.setAuthor({
      index: 0,
      authorFullName: `Author`,
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
  it(`
  GIVEN a new instance
  WHEN no fields are modified
  SHOULD return false for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.false
  })

  it(`
  GIVEN a new instance
  WHEN title was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    addBookState.setTitle({
      title: `Title`,
    })

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN count was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    addBookState.setCount({
      count: 3,
    })

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN annotation was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    addBookState.setAnnotation({
      annotation: `Annotation`,
    })

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN author was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    addBookState.setAuthor({
      index: 0,
      authorFullName: `Author`,
    })

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN bookCoverUrl was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    addBookState.setBookCoverUrl({
      bookCoverUrl: `http://image.com`,
    })
      
    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })
}

function savingTest() {
  it(`
  GIVEN initial isSaving = false
  WHEN setIsSaving and setIsSaved are triggered
  SHOULD toggle isSaving to true and then back to false
  `, () => {
    const addBookState = new AddBookState()

    expect(addBookState.isSaving).to.be.false

    addBookState.setIsSaving()
    expect(addBookState.isSaving).to.be.true
    
    addBookState.setIsSaved()
    expect(addBookState.isSaving).to.be.false
  })

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN setIsTriedToSubmit()
  SHOULD change value to true
  WHEN resetIsTriedToSubmit()
  SHOULD change value to false
  `, () => {
    const addBookState = new AddBookState()

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
  expect(addBookState.book.count).to.eq(1)
  expect(addBookState.book.language).to.eq(`ru`)
  expect(addBookState.book.annotation).to.eq(``)
  expect(addBookState.book.bookCoverUrl).to.eq(``)
  expect(addBookState.book.authors).to.deep.eq([
    {
      fullName: ``, 
    },
  ])
}

function setBookData({
  addBookState,
}: {
  addBookState: AddBookState,
}) {
  addBookState.setTitle({
    title: `Title`,
  })
  addBookState.setCount({
    count: 3,
  })
  addBookState.setLanguage({
    language: `en`,
  })
  addBookState.setAnnotation({
    annotation: `Annotation`,
  })
  addBookState.setAuthor({
    index: 0,
    authorFullName: `Author`,
  })
  addBookState.setBookCoverUrl({
    bookCoverUrl: `http://image.com`,
  })
}