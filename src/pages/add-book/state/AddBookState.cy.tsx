import { AddBookState } from './AddBookState'

describe(`AddBookState`, () => {
  describe(`Initial state`, () => {
    it(`Should have default values`, () => {
      const state = new AddBookState()

      checkExpectedInitialState({
        state,
      })
    })
  })

  describe(`Setters`, () => {
    it(`Should set book data without author`, () => {
      const state = new AddBookState()

      setBookData({
        state,
        isSetAuthor: false,
      })

      expect(state.book.title).to.eq(`My Book`)
      expect(state.book.count).to.eq(3)
      expect(state.book.language).to.eq(`eng`)
      expect(state.book.annotation).to.eq(`Some annotation`)
      expect(state.book.bookCoverUrl).to.eq(`http://image.com`)
    })

    it(`Should update an author by index`, () => {
      const state = new AddBookState()

      state.book.authors[0].fullName = `John Doe`

      expect(state.book.authors).to.deep.eq([
        {
          fullName: `John Doe`, 
        },
      ])
    })

    it(`Should add a new empty author`, () => {
      const state = new AddBookState()

      state.addAuthor()
      
      expect(state.book.authors).to.deep.eq([
        {
          fullName: ``,
        },
        {
          fullName: ``,
        },
      ])
    })

    it(`Should remove an author by index`, () => {
      const state = new AddBookState()

      state.book.authors[0].fullName = `First`
      state.addAuthor()

      state.book.authors[1].fullName = `Second`
      state.removeAuthor(0)

      expect(state.book.authors).to.deep.eq([
        {
          fullName: `Second`,
        },
      ])
    })
  })

  describe(`Reset`, () => {
    it(`Should reset all fields to default`, () => {
      const state = new AddBookState()
      
      setBookData({
        state,
        isSetAuthor: true,
      })

      state.reset()

      checkExpectedInitialState({
        state,
      })
    })
  })

  describe(`isFormDirty`, () => {
    it(`Should return false for initial state`, () => {
      const state = new AddBookState()

      expect(state.isSomethingFilledWithinTheForm()).to.be.false
    })

    it(`Should return true if title is changed`, () => {
      const state = new AddBookState()

      state.book.title = `New Title`

      expect(state.isSomethingFilledWithinTheForm()).to.be.true
    })

    it(`Should return true if count is changed`, () => {
      const state = new AddBookState()

      state.book.count = 2

      expect(state.isSomethingFilledWithinTheForm()).to.be.true
    })

    it(`Should return true if annotation is changed`, () => {
      const state = new AddBookState()

      state.book.annotation = `New Annotation`

      expect(state.isSomethingFilledWithinTheForm()).to.be.true
    })

    it(`Should return true if authors are added`, () => {
      const state = new AddBookState()

      state.book.authors[0].fullName = `John Doe`
      expect(state.isSomethingFilledWithinTheForm()).to.be.true
    })

    it(`Should return true if bookCoverUrl is changed`, () => {
      const state = new AddBookState()

      state.book.bookCoverUrl = `http://newimage.com`
      
      expect(state.isSomethingFilledWithinTheForm()).to.be.true
    })
  })

  describe(`switchIsSubmitting`, () => {
    it(`Should change isSubmitting flag when trigger switchIsSubmitting`, () => {
      const state = new AddBookState()

      expect(state.isSaving).to.be.false
      state.setIsSaving()
      expect(state.isSaving).to.be.true
      state.setIsSaved()
      expect(state.isSaving).to.be.false
    })
  })
})

function checkExpectedInitialState({
  state,
}: {
  state: AddBookState,
}) {
  expect(state.book.title).to.eq(``)
  expect(state.book.count).to.eq(1)
  expect(state.book.language).to.eq(`rus`)
  expect(state.book.annotation).to.eq(``)
  expect(state.book.bookCoverUrl).to.eq(``)
  expect(state.book.authors).to.deep.eq([
    {
      fullName: ``, 
    },
  ])
}

function setBookData({
  state,
  isSetAuthor,
}: {
  state: AddBookState,
  isSetAuthor: boolean,
}) {
  state.book.title = `My Book`
  state.book.count = 3
  state.book.language = `eng`
  state.book.annotation = `Some annotation`
  state.book.bookCoverUrl = `http://image.com`

  if (isSetAuthor) {
    state.book.authors[0].fullName = `John`
  }
}