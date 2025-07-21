import { makeAutoObservable } from 'mobx'
import isEqual from 'lodash.isequal'

const EMPTY_BOOK: AddBookType = {
  title: ``,
  count: 1,
  language: `ru`,
  annotation: ``,
  authors: [
    {
      fullName: ``,
    },
  ],
  bookCoverUrl: ``,
}

export class AddBookState {
  private _book: AddBookType = EMPTY_BOOK

  private _isSaving = false    
  private _isTriedToSubmit = false  

  constructor() {
    makeAutoObservable(this)
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

  get isTitleValid() {
    return this._book.title !== ``
  }

  get isAnnotationValid() {
    return this._book.annotation !== ``
  }

  get isAuthorsFieldValid() {
    return this
      ._book
      .authors
      .some(author => author.fullName !== ``)
  }

  get isValid() {
    return (
      this.isTitleValid &&
      this.isAnnotationValid &&
      this.isAuthorsFieldValid
    )
  }

  get errors() {
    return {
      isTitleError: !this.isTitleValid && this._isTriedToSubmit,
      isAnnotationError: !this.isAnnotationValid && this._isTriedToSubmit,
      isAuthorsError: !this.isAuthorsFieldValid && this._isTriedToSubmit,
    }
  }

  setTitle({
    title,
  }: {
    title: string,
  }) {
    this._book.title = title
  }

  setCount({
    count,
  }: {
    count: number,
  }) {
    this._book.count = count
  }

  setLanguage({
    language,
  }: {
    language: string,
  }) {
    this._book.language = language
  }

  setAnnotation({
    annotation,
  }: {
    annotation: string,
  }) {
    this._book.annotation = annotation
  }

  setBookCoverUrl({
    bookCoverUrl,
  }: {
    bookCoverUrl: string,
  }) {
    this._book.bookCoverUrl = bookCoverUrl
  }

  setAuthor({
    index, 
    authorFullName,
  }: {
    index: number, 
    authorFullName: string,
  }) {
    this._book.authors = this
      ._book
      .authors
      .map((authors, i) =>
        i === index 
          ? {
            ...authors,
            fullName: authorFullName, 
          } 
          : authors,
      )
  }

  addAuthor() {
    this._book.authors = [
      ...this._book.authors,
      {
        fullName: ``, 
      },
    ]
  }

  removeAuthor({
    index,
  }: {
    index: number,
  }) {
    this._book.authors = this
      ._book
      .authors
      .filter((_author, i) => i !== index)
  }

  reset() {
    this._book = structuredClone(EMPTY_BOOK)
  }

  isSomethingFilledWithinTheForm() { 
    return !isEqual(this._book, EMPTY_BOOK)
  }

  setIsSaving() {
    this._isSaving = true
  }

  setIsSaved() {
    this._isSaving = false
  }
  
  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }
}
