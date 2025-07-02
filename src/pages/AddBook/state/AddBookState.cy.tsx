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

      expect(state.title).to.eq(`My Book`)
      expect(state.count).to.eq(3)
      expect(state.language).to.eq(`eng`)
      expect(state.annotation).to.eq(`Some annotation`)
      expect(state.coverUrl).to.eq(`http://image.com`)
    })

    it(`Should update an author by index`, () => {
      const state = new AddBookState()
      state.setAuthor(0, `John Doe`)
      expect(state.authors).to.deep.eq([
        `John Doe`,
      ])
    })

    it(`Should add a new empty author`, () => {
      const state = new AddBookState()
      state.addAuthor()
      
      expect(state.authors).to.deep.eq([
        ``,
        ``,
      ])
    })

    it(`Should remove an author by index`, () => {
      const state = new AddBookState()
      state.setAuthor(0, `First`)
      state.addAuthor()
      state.setAuthor(1, `Second`)
      state.removeAuthor(0)
      expect(state.authors).to.deep.eq([
        `Second`,
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
      expect(state.isFormDirty()).to.be.false
    })

    it(`Should return true if title is changed`, () => {
      const state = new AddBookState()
      state.setTitle(`New Title`)
      expect(state.isFormDirty()).to.be.true
    })

    it(`Should return true if count is changed`, () => {
      const state = new AddBookState()
      state.setCount(2)
      expect(state.isFormDirty()).to.be.true
    })

    it(`Should return true if annotation is changed`, () => {
      const state = new AddBookState()
      state.setAnnotation(`New Annotation`)
      expect(state.isFormDirty()).to.be.true
    })

    it(`Should return true if authors are added`, () => {
      const state = new AddBookState()
      state.setAuthor(0, `John Doe`)
      expect(state.isFormDirty()).to.be.true
    })

    it(`Should return true if coverUrl is changed`, () => {
      const state = new AddBookState()
      state.setCoverUrl(`http://newimage.com`)
      expect(state.isFormDirty()).to.be.true
    })
  })
})

function checkExpectedInitialState({
  state,
}: {
  state: AddBookState,
}) {
  expect(state.title).to.eq(``)
  expect(state.count).to.eq(1)
  expect(state.language).to.eq(`rus`)
  expect(state.annotation).to.eq(``)
  expect(state.coverUrl).to.eq(``)
  expect(state.authors).to.deep.eq([
    ``,
  ])
}

function setBookData({
  state,
  isSetAuthor,
}: {
  state: AddBookState,
  isSetAuthor: boolean,
}) {
  state.setTitle(`My Book`)
  state.setCount(3)
  state.setLanguage(`eng`)
  state.setAnnotation(`Some annotation`)
  state.setCoverUrl(`http://image.com`)

  if (isSetAuthor) {
    state.setAuthor(0, `John`)
  }
}