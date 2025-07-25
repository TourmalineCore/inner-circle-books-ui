import { BookState } from './BookState'

const bookState = new BookState()

describe(`BookState`, () => {
  it(`
  GIVEN a BookState
  WHEN initialize
  SHOULD have default book values
  `, () => {
    expect(bookState.book.id).to.eq(1)
    expect(bookState.book.title).to.eq(``)
    expect(bookState.book.annotation).to.eq(``)
    expect(bookState.book.language).to.eq(`ru`)
    expect(bookState.book.authors).to.deep.eq([
      {
        fullName: ``, 
      },
    ])
    expect(bookState.book.bookCoverUrl).to.eq(``)
    expect(bookState.book.bookCopies).to.deep.eq([
      {
        bookCopyId: 1,
      },
    ])
  })

  it(`
  GIVEN the BookState
  WHEN set book data
  SHOULD reflect new values in the book object
  `, () => {
    bookState.initialize({
      loadedBook: {
        id: 1,
        title: `Разработка ценностных предложений`,
        annotation: `Аннотация`,
        language: `ru`,
        authors: [
          {
            fullName: `Алекс Остервальдер`,
          },
        ],
        bookCoverUrl: `https://book.jpg`,
        bookCopies: [
          {
            bookCopyId: 1,
          },
          {
            bookCopyId: 2,
          },
        ],
      },
    })

    expect(bookState.book.id).to.eq(1)
    expect(bookState.book.title).to.eq(`Разработка ценностных предложений`)
    expect(bookState.book.annotation).to.eq(`Аннотация`)
    expect(bookState.book.language).to.eq(`ru`)
    expect(bookState.book.authors).to.deep.eq([
      {
        fullName: `Алекс Остервальдер`, 
      },
    ])
    expect(bookState.book.bookCoverUrl).to.eq(`https://book.jpg`)
    expect(bookState.book.bookCopies).to.deep.eq([
      {
        bookCopyId: 1,
      },
      {
        bookCopyId: 2,
      },
    ])
  })

  it(`
  GIVEN the BookState
  WHEN book data is set
  AND called get count function
  SHOULD return correct count value
  `, () => {
    expect(bookState.count).to.eq(2)
  })
})
