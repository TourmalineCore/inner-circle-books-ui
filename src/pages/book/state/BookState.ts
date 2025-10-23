import { makeAutoObservable } from 'mobx'
import { Language } from '../../../common/enums/language'

const EMPTY_BOOK: BookType = {
  id: 1,
  title: ``,
  annotation: ``,
  language: Language.RU,
  authors: [
    {
      fullName: ``, 
    },
  ],
  coverUrl: ``,
  bookCopiesIds: [],
  employeesWhoReadNow: [],
}

export class BookState {
  private _book: BookType = {
    ...EMPTY_BOOK, 
  }

  private _selectedCopies: { 
    [key: number]: boolean, 
  } = {}

  private _isTriedToSubmit = false

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
      .bookCopiesIds
      .forEach((
        bookCopyId,
      ) => {
        this._selectedCopies[bookCopyId] = true
      })
  }

  get book() {
    return this._book
  }

  get count() {
    return this._book
      .bookCopiesIds
      .length
  }

  get areAllCopiesSelected() {
    return this._book
      .bookCopiesIds
      .every((
        bookCopyId,
      ) =>
        this._selectedCopies[bookCopyId] === true, 
      )
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get selectedBookCopies() {
    return this._book.bookCopiesIds.filter((
      bookCopyId, 
    ) => 
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
        .bookCopiesIds
        .forEach((
          bookCopyId,
        ) => {
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
      .bookCopiesIds
      .forEach((
        bookCopyId,
      ) => {
        this._selectedCopies[bookCopyId] = true
      })
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }
}
