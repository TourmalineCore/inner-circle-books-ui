import { BookState } from './BookState'

const bookState = new BookState()

bookState.initialize({
  id: 1,
  title: `Разработка ценностных предложений`,
  annotation: `Аннотация`,
  count: 1,
  language: `rus`,
  authors: [
    {
      fullName: `Алекс Остервальдер`,
    },
  ],
  bookCoverUrl: `https://example.jpg`,
})

describe(`BookState`, () => {
  describe(`Initialize`, () => {
    it(`Should have initialized values`, () => {
    
      expect(bookState.id).to.eq(1)
      expect(bookState.title).to.eq(`Разработка ценностных предложений`)
      expect(bookState.annotation).to.eq(`Аннотация`)
      expect(bookState.count).to.eq(1)
      expect(bookState.language).to.eq(`rus`)
      expect(bookState.authors).to.deep.eq([
        {
          fullName: `Алекс Остервальдер`, 
        },
      ])
      expect(bookState.bookCoverUrl).to.eq(`https://example.jpg`)
    })
  })
})