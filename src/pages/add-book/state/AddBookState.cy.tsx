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

    expect(addBookState.title).to.eq(`Title`)
    expect(addBookState.count).to.eq(3)
    expect(addBookState.language).to.eq(`eng`)
    expect(addBookState.annotation).to.eq(`Annotation`)
    expect(addBookState.authors).to.deep.eq([
      {
        fullName: `Author`, 
      },
    ])
    expect(addBookState.bookCoverUrl).to.eq(`http://image.com`)
  })

  it(`
  GIVEN a book with one author
  WHEN addAuthor is called
  SHOULD append a new empty author
  `, () => {
    const addBookState = new AddBookState()

    addBookState.addAuthor()
      
    expect(addBookState.authors).to.deep.eq([
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

    addBookState.authors[0].fullName = `First`
    addBookState.addAuthor()
    addBookState.authors[1].fullName = `Second`
    addBookState.removeAuthor({
      index: 0,
    })

    expect(addBookState.authors).to.deep.eq([
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
      value: `Annotation`,
    })
    addBookState.setAuthor({
      index: 0,
      value: `Author`,
    })

    expect(addBookState.isValid).to.be.false
    expect(addBookState.errors.title).to.be.true
    expect(addBookState.errors.annotation).to.be.false
    expect(addBookState.errors.authors).to.be.false
  })

  it(`
  GIVEN an empty annotation
  WHEN isValid is accessed
  SHOULD return false and set annotation error to true
  `, () => {
    const addBookState = new AddBookState()

    addBookState.setTitle({
      value: `Title`,
    })
    addBookState.setAuthor({
      index: 0,
      value: `Author`,
    })

    expect(addBookState.isValid).to.be.false
    expect(addBookState.errors.annotation).to.be.true
  })

  it(`
  GIVEN all authors are empty
  WHEN isValid is accessed
  SHOULD return false and set authors error to true
  `, () => {
    const addBookState = new AddBookState()

    addBookState.setTitle({
      value: `Title`,
    })
    addBookState.setAnnotation({
      value: `Annotation`,
    })
    addBookState.addAuthor

    expect(addBookState.isValid).to.be.false
    expect(addBookState.errors.authors).to.be.true
  })

  it(`
  GIVEN valid title, annotation, and author
  WHEN isValid is accessed
  SHOULD return true and all errors should be false
  `, () => {
    const addBookState = new AddBookState()

    addBookState.setTitle({
      value: `Title`,
    })
    addBookState.setAnnotation({
      value: `Annotation`,
    })
    addBookState.setAuthor({
      index: 0,
      value: `Author`,
    })

    expect(addBookState.isValid).to.be.true
    expect(addBookState.errors).to.deep.equal({
      title: false,
      annotation: false,
      authors: false,
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
      value: `Title`,
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
      value: 3,
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
      value: `Annotation`,
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
      value: `Author`,
    })

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN bookCoverUrl was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    addBookState.setCoverUrl({
      value: `http://image.com`,
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
  expect(addBookState.title).to.eq(``)
  expect(addBookState.count).to.eq(1)
  expect(addBookState.language).to.eq(`rus`)
  expect(addBookState.annotation).to.eq(``)
  expect(addBookState.bookCoverUrl).to.eq(``)
  expect(addBookState.authors).to.deep.eq([
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
    value: `Title`,
  })
  addBookState.setCount({
    value: 3,
  })
  addBookState.setLanguage({
    value: `eng`,
  })
  addBookState.setAnnotation({
    value: `Annotation`,
  })
  addBookState.setAuthor({
    index: 0,
    value: `Author`,
  })
  addBookState.setCoverUrl({
    value: `http://image.com`,
  })
}