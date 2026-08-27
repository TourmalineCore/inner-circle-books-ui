import isEqual from 'lodash.isequal'
import { makeAutoObservable } from 'mobx'
import { ProgressOfReading } from '../../../common/enums/progressOfReading'

export const EMPTY_BOOK = {
  title: ``,
  coverUrl: ``,
}

export const EMPTY_BOOK_FEEDBACK = {
  progressOfReading: ``,
  rating: 0,
  advantages: ``,
  disadvantages: ``,
}

export class BookFeedbackState {
  private _book = {
    ...EMPTY_BOOK,
  }
  private _bookFeedback = {
    ...EMPTY_BOOK_FEEDBACK, 
  }

  private _isSaving = false    
  private _isTriedToSubmit = false

  constructor() {
    makeAutoObservable(this)
  }

  initializeBook({
    loadedBook,
  }: {
    loadedBook: {
      title: string,
      coverUrl: string,
    },
  }) {
    this._book = {
      title: loadedBook.title,
      coverUrl: loadedBook.coverUrl,
    }
  }

  get book() {
    return this._book
  }

  get bookFeedback() {
    return this._bookFeedback
  }

  get isSaving() {
    return this._isSaving
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get isProgressOfReadingValid() {
    return this._bookFeedback.progressOfReading !== ``
  }

  get isFeedbackDisabled() {
    return this._bookFeedback.progressOfReading === ProgressOfReading.NotReadAtAll
  }
  
  get isRatingValid() {
    if (this.isFeedbackDisabled) {
      return true
    }

    return this._bookFeedback.rating !== 0
  }

  get isValid() {
    return this.isProgressOfReadingValid && this.isRatingValid
  }

  get errors() {
    return {
      isProgressOfReadingError: !this.isProgressOfReadingValid && this._isTriedToSubmit,
      isRatingError: !this.isFeedbackDisabled && !this.isRatingValid && this._isTriedToSubmit,
    }
  }

  setProgressOfReading({
    progressOfReading,
  }: {
    progressOfReading: string,
  }) {
    this._bookFeedback.progressOfReading = progressOfReading
  }

  setRating({
    rating, 
  }: { 
    rating: number, 
  }) {
    this._bookFeedback.rating = rating
  }

  setAdvantages({
    advantages,
  }: {
    advantages: string,
  }) {
    this._bookFeedback.advantages = advantages
  }

  setDisadvantages({
    disadvantages,
  }: {
    disadvantages: string,
  }) {
    this._bookFeedback.disadvantages = disadvantages
  }

  isSomethingFilledWithinTheForm() { 
    return !isEqual(this._bookFeedback.progressOfReading, ``) || !isEqual(this._bookFeedback.rating, 0)
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
