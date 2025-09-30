import { Language } from '../../../common/enums/language'
import { BookState } from './BookState'

describe(`BookState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Book Data`, bookDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTest)
})

function initializationTests() {
  const bookState = new BookState()
  
  it(`
  GIVEN a BookState
  WHEN initialize
  SHOULD have default book values
  `, () => {
    expect(bookState.book.id).to.eq(1)
    expect(bookState.book.title).to.eq(``)
    expect(bookState.book.annotation).to.eq(``)
    expect(bookState.book.language).to.eq(Language.RU)
    expect(bookState.book.authors).to.deep.eq([
      {
        fullName: ``, 
      },
    ])
    expect(bookState.book.coverUrl).to.eq(``)
    expect(bookState.book.bookCopiesIds).to.deep.eq([])
  })
}

function bookDataTests() {
  let bookState: BookState
  
  beforeEach(() => {
    bookState = new BookState()

    bookState.initialize({
      loadedBook: {
        id: 1,
        title: `Разработка ценностных предложений`,
        annotation: `Аннотация`,
        language: Language.RU,
        authors: [
          {
            fullName: `Алекс Остервальдер`,
          },
        ],
        coverUrl: `https://book.jpg`,
        bookCopiesIds: [
          1,
          2,
        ],
        employeesWhoReadNow: [
          {
            employeeId: 1,
            fullName: `Ceo Ceo Ceo`,
            bookCopyId: 1,
          },
        ],
      },
    })
  })

  it(`
  GIVEN the BookState
  WHEN set book data
  SHOULD display new values in the book object
  `, () => {
    expect(bookState.book.id).to.eq(1)
    expect(bookState.book.title).to.eq(`Разработка ценностных предложений`)
    expect(bookState.book.annotation).to.eq(`Аннотация`)
    expect(bookState.book.language).to.eq(Language.RU)
    expect(bookState.book.authors).to.deep.eq([
      {
        fullName: `Алекс Остервальдер`, 
      },
    ])
    expect(bookState.book.coverUrl).to.eq(`https://book.jpg`)
    expect(bookState.book.bookCopiesIds).to.deep.eq([
      1,
      2,
    ])
    expect(bookState.book.employeesWhoReadNow).to.deep.eq([
      {
        employeeId: 1,
        fullName: `Ceo Ceo Ceo`,
        bookCopyId: 1,
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

  it(`
  GIVEN the BookState
  WHEN toggleBookCopyChecked
  SHOULD toggle the selected state of a book copy
  `, () => {
    expect(bookState.isBookCopySelected({
      id: 1, 
    })).to.be.true

    bookState.toggleBookCopyChecked({
      id: 1, 
    })

    expect(bookState.isBookCopySelected({
      id: 1, 
    })).to.be.false

    bookState.toggleBookCopyChecked({
      id: 1, 
    })

    expect(bookState.isBookCopySelected({
      id: 1, 
    })).to.be.true
  })

  it(`
  GIVEN the BookState
  WHEN toggleSelectAllCopies with false
  SHOULD deselect all book copies
  WHEN toggleSelectAllCopies with true
  SHOULD select all book copies
  `, () => {
    bookState.toggleSelectAllCopies({
      checked: false, 
    })

    expect(bookState.areAllCopiesSelected).to.be.false

    expect(bookState.isBookCopySelected({
      id: 1, 
    })).to.be.false

    expect(bookState.isBookCopySelected({
      id: 2, 
    })).to.be.false

    bookState.toggleSelectAllCopies({
      checked: true, 
    })

    expect(bookState.areAllCopiesSelected).to.be.true

    expect(bookState.isBookCopySelected({
      id: 1, 
    })).to.be.true

    expect(bookState.isBookCopySelected({
      id: 2, 
    })).to.be.true
  })

  it(`
  GIVEN the BookState
  WHEN areAllCopiesSelected
  SHOULD return true if all copies are selected
  `, () => {
    bookState.toggleSelectAllCopies({
      checked: true, 
    })

    expect(bookState.areAllCopiesSelected).to.be.true
  })

  it(`
  GIVEN the BookState
  WHEN areAllCopiesSelected
  SHOULD return false if not all copies are selected
  `, () => {
    bookState.toggleBookCopyChecked({
      id: 1, 
    })
    
    expect(bookState.areAllCopiesSelected).to.be.false
  })

  it(`
  GIVEN the BookState
  WHEN resetSelectedCopies
  SHOULD reset the selected copies to default state
  `, () => {
    bookState.resetSelectedCopies()

    expect(bookState.areAllCopiesSelected).to.be.true
    expect(bookState.isBookCopySelected({
      id: 1, 
    })).to.be.true
    expect(bookState.isBookCopySelected({
      id: 2, 
    })).to.be.true
  })
}

function isTriedToSubmitTest() {
  const bookState = new BookState()

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN setIsTriedToSubmit()
  SHOULD change value to true
  WHEN resetIsTriedToSubmit()
  SHOULD change value to false
  `, () => {
    expect(bookState.isTriedToSubmit).to.be.false

    bookState.setIsTriedToSubmit()
    expect(bookState.isTriedToSubmit).to.be.true

    bookState.resetIsTriedToSubmit()
    expect(bookState.isTriedToSubmit).to.be.false
  })
}