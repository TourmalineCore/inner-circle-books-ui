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
  coverUrl: ``,
  bookCopies: [
    {
      bookCopyId: 1,
      copyNumber: 1,
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
  }: {
    loadedBook: BookType,
  }) {
    this._book = loadedBook

    // Initialize all copies as selected
    this._book
      .bookCopies
      .forEach(({
        bookCopyId,
      }) => {
        this._selectedCopies[bookCopyId] = true
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
      .every(({
        bookCopyId,
      }) =>
        this._selectedCopies[bookCopyId] === true, 
      )
  }

  toggleBookCopyChecked({
    id,
  }: {
    id: number,
  }) {
    this._selectedCopies[id] = !this._selectedCopies[id]
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
        .forEach(({
          bookCopyId,
        }) => {
          this._selectedCopies[bookCopyId] = true
        })
    }
  }

  isBookCopySelected({
    id,
  }: {
    id: number,
  }) {
    return !!this._selectedCopies[id]
  }

  resetSelectedCopies() {
    this._selectedCopies = {}

    this._book
      .bookCopies
      .forEach(({
        bookCopyId,
      }) => {
        this._selectedCopies[bookCopyId] = true
      })
  }
}
