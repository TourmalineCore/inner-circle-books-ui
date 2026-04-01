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
  knowledgeAreasIds: [],
}

export class BookState {
  private _book: BookType = {
    ...EMPTY_BOOK, 
  }

  private _isTriedToSubmit = false
  private _feedback: Feedback[] = []

  constructor() {
    makeAutoObservable(this)
  }

  initializeBook({
    loadedBook,
  }: {
    loadedBook: BookType,
}) {
    this._book = loadedBook
  }

  initializeFeedback({
    loadedFeedback,
  }: {
    loadedFeedback: Feedback[],
}) {
    this._feedback = loadedFeedback
  }

  get book() {
    return this._book
  }

  get count() {
    return this._book
      .bookCopiesIds
      .length
  }

  get feedback() {
    return this._feedback
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
