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
  }

  get book() {
    return this._book
  }

  get count() {
    return this._book
      .bookCopiesIds
      .length
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }
}
