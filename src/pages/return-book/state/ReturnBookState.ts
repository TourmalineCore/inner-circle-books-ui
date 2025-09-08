import { makeAutoObservable } from 'mobx'

const EMPTY_BOOK = {
  id: 1,
  title: ``,
  coverUrl: ``,
}

export class ReturnBookState {
  private _book = {
    ...EMPTY_BOOK, 
  }
  private _isTriedToSubmit = false

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    loadedBook,
  }: {
    loadedBook: {
      id: number,
      title: string,
      coverUrl: string,
    },
  }) {
    this._book = loadedBook
  }

  get book() {
    return this._book
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
