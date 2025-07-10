import { AddBookState } from './AddBookState'

describe(`AddBookState`, () => {
  describe(`Initialization`, initializationTest)
  describe(`Setters`, settersTests)
  describe(`Reset`, resetTest)
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

    expect(addBookState.book.title).to.eq(`My Book`)
    expect(addBookState.book.count).to.eq(3)
    expect(addBookState.book.language).to.eq(`eng`)
    expect(addBookState.book.annotation).to.eq(`Some annotation`)
    expect(addBookState.book.authors).to.deep.eq([
      {
        fullName: `John`, 
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
    addBookState.removeAuthor(0)

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

    addBookState.book.title = `New Title`
    
    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN count was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    addBookState.book.count = 2

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN annotation was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    addBookState.book.annotation = `New Annotation`

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN author was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    addBookState.book.authors[0].fullName = `John Doe`

    expect(addBookState.isSomethingFilledWithinTheForm()).to.be.true
  })

  it(`
  GIVEN a new instance
  WHEN bookCoverUrl was modified
  SHOULD return true for isSomethingFilledWithinTheForm
  `, () => {
    const addBookState = new AddBookState()

    addBookState.book.bookCoverUrl = `http://newimage.com`
      
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
}

function checkExpectedInitialState({
  addBookState, 
}: { 
  addBookState: AddBookState, 
}) {
  expect(addBookState.book.title).to.eq(``)
  expect(addBookState.book.count).to.eq(1)
  expect(addBookState.book.language).to.eq(`rus`)
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
  addBookState.book.title = `My Book`
  addBookState.book.count = 3
  addBookState.book.language = `eng`
  addBookState.book.annotation = `Some annotation`
  addBookState.book.authors[0].fullName = `John`
  addBookState.book.bookCoverUrl = `http://image.com`
}