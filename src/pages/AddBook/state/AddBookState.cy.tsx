/* eslint-disable array-bracket-newline */
import { AddBookState } from './AddBookState'

describe(`AddBookState`, () => {
  describe(`Initial state`, () => {
    it(`Should have default values`, () => {
      const state = new AddBookState()

      expect(state.title).to.eq(``)
      expect(state.count).to.eq(1)
      expect(state.language).to.eq(`rus`)
      expect(state.annotation).to.eq(``)
      expect(state.coverUrl).to.eq(``)
      expect(state.authors).to.deep.eq([``])
    })
  })

  describe(`Setters`, () => {
    it(`Should set title`, () => {
      const state = new AddBookState()
      state.setTitle(`My Book`)
      expect(state.title).to.eq(`My Book`)
    })

    it(`Should set count`, () => {
      const state = new AddBookState()
      state.setCount(3)
      expect(state.count).to.eq(3)
    })

    it(`Should set language`, () => {
      const state = new AddBookState()
      state.setLanguage(`eng`)
      expect(state.language).to.eq(`eng`)
    })

    it(`Should set annotation`, () => {
      const state = new AddBookState()
      state.setAnnotation(`Some annotation`)
      expect(state.annotation).to.eq(`Some annotation`)
    })

    it(`Should set coverUrl`, () => {
      const state = new AddBookState()
      state.setCoverUrl(`http://image.com`)
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
      
      state.setTitle(`Temp`)
      state.setCount(5)
      state.setLanguage(`eng`)
      state.setAnnotation(`Temp annotation`)
      state.setCoverUrl(`cover.png`)
      state.setAuthor(0, `John`)
      state.addAuthor()

      state.reset()

      expect(state.title).to.eq(``)
      expect(state.count).to.eq(1)
      expect(state.language).to.eq(`rus`)
      expect(state.annotation).to.eq(``)
      expect(state.coverUrl).to.eq(``)
      expect(state.authors).to.deep.eq([``])
    })
  })
})
