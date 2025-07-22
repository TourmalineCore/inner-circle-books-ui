import { BookState } from './BookState'

const bookState = new BookState()

bookState.initialize({
  loadedBook: {
    id: 1,
    title: `Разработка ценностных предложений`,
    annotation: `Аннотация`,
    count: 1,
    language: `ru`,
    authors: [
      {
        fullName: `Алекс Остервальдер`,
      },
    ],
    bookCoverUrl: `https://book.jpg`,
  },
})

describe(`BookState`, () => {
  describe(`Initialize`, () => {
    it(`Should have initialized values`, () => {
      expect(bookState.book.id).to.eq(1)
      expect(bookState.book.title).to.eq(`Разработка ценностных предложений`)
      expect(bookState.book.annotation).to.eq(`Аннотация`)
      expect(bookState.book.count).to.eq(1)
      expect(bookState.book.language).to.eq(`ru`)
      expect(bookState.book.authors).to.deep.eq([
        {
          fullName: `Алекс Остервальдер`, 
        },
      ])
      expect(bookState.book.bookCoverUrl).to.eq(`https://book.jpg`)
    })
  })
})
