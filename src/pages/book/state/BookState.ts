import { makeAutoObservable } from 'mobx'

const EMPTY_BOOK: BookType = {
  id: 1,
  title: ``,
  annotation: ``,
  language: `ru`,
  authors: [
    {
      fullName: ``, 
    },
  ],
  bookCoverUrl: ``,
  bookCopies: [
    {
      bookCopyId: 1,
    },
  ],
}

export class BookState {
  private _book: BookType = {
    ...EMPTY_BOOK, 
  }

  private _selectedCopies: { 
    [key: number]: boolean, 
  } = {}

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    loadedBook,
    mockBookCopies,
  }: {
    loadedBook: BookType,
    mockBookCopies?: BookCopyType[],
  }) {
    this._book = loadedBook

    // TODO remove when fix request
    if (mockBookCopies) {
      this._book.bookCopies = mockBookCopies
    }

    // Initialize all copies as selected
    this._book.bookCopies.forEach(bookCopy => {
      this._selectedCopies[bookCopy.bookCopyId] = true
    })
  }

  get book() {
    return this._book
  }

  get count() {
    return this._book
      .bookCopies
      .length
  }

  get areAllCopiesSelected() {
    return this._book
      .bookCopies
      .every(bookCopy =>
        this._selectedCopies[bookCopy.bookCopyId] === true, 
      )
  }

  toggleBookCopyChecked({
    bookCopyId,
  }: {
    bookCopyId: number,
  }) {
    this._selectedCopies[bookCopyId] = !this._selectedCopies[bookCopyId]
  }

  toggleSelectAllCopies({
    checked,
  }: {
    checked: boolean,
  }) {
    this._selectedCopies = {}

    if (checked) {
      this._book
        .bookCopies
        .forEach(bookCopy => {
          this._selectedCopies[bookCopy.bookCopyId] = true
        })
    }
  }

  isBookCopySelected({
    bookCopyId,
  }: {
    bookCopyId: number,
  }) {
    return !!this._selectedCopies[bookCopyId]
  }
}
