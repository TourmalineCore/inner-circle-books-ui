import isEqual from 'lodash.isequal'
import { makeAutoObservable } from 'mobx'

const EMPTY_BOOK = {
  id: 1,
  title: ``,
  coverUrl: ``,
  progressOfReading: ``,
}

export class ReturnBookState {
  private _book = {
    ...EMPTY_BOOK, 
  }

  private _isSaving = false    
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
    this._book = {
      id: loadedBook.id,
      title: loadedBook.title,
      coverUrl: loadedBook.coverUrl,
      progressOfReading: ``,
    }
  }

  get book() {
    return this._book
  }

  get isSaving() {
    return this._isSaving
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get isProgressOfReadingValid() {
    return this._book.progressOfReading !== ``
  }

  get isValid() {
    return this.isProgressOfReadingValid
  }

  get errors() {
    return {
      isProgressOfReadingError: !this.isProgressOfReadingValid && this._isTriedToSubmit,
    }
  }

  setProgressOfReading({
    progressOfReading,
  }: {
    progressOfReading: string,
  }) {
    this._book.progressOfReading = progressOfReading
  }

  reset() {
    this._book.progressOfReading = ``
  }

  isSomethingFilledWithinTheForm() { 
    return !isEqual(this._book.progressOfReading, ``)
  }

  setIsSaving() {
    this._isSaving = true
  }

  resetIsSaving() {
    this._isSaving = false
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }
}
