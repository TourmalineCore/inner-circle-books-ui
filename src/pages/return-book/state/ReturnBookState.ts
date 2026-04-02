import isEqual from 'lodash.isequal'
import { makeAutoObservable } from 'mobx'

const EMPTY_BOOK: ReturnBook = {
  title: ``,
  coverUrl: ``,
  progressOfReading: ``,
  rating: 0,
  advantages: ``,
  disadvantages: ``,
}

export class ReturnBookState {
  private _book: ReturnBook = {
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
      ...EMPTY_BOOK,
      id: loadedBook.id,
      title: loadedBook.title,
      coverUrl: loadedBook.coverUrl,
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

  get isRatingValid() {
    return this._book.rating !== 0
  }

  get isValid() {
    return this.isProgressOfReadingValid && this.isRatingValid
  }

  get errors() {
    return {
      isProgressOfReadingError: !this.isProgressOfReadingValid && this._isTriedToSubmit,
      isRatingError: !this.isRatingValid && this._isTriedToSubmit,
    }
  }

  setProgressOfReading({
    progressOfReading,
  }: {
    progressOfReading: string,
  }) {
    this._book.progressOfReading = progressOfReading
  }

  setRating({
    rating, 
  }: { 
    rating: number, 
  }) {
    this._book.rating = rating
  }

  setAdvantages({
    advantages,
  }: {
    advantages: string,
  }) {
    this._book.advantages = advantages
  }

  setDisadvantages({
    disadvantages,
  }: {
    disadvantages: string,
  }) {
    this._book.disadvantages = disadvantages
  }

  isSomethingFilledWithinTheForm() { 
    return !isEqual(this._book.progressOfReading, ``) || !isEqual(this._book.rating, 0)
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
