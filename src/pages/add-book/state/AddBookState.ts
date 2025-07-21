/* eslint-disable array-bracket-newline */
import { makeAutoObservable } from 'mobx'

const defaultBook: AddBookType = {
  title: ``,
  count: 1,
  language: `ru`,
  annotation: ``,
  authors: [{
    fullName: ``, 
  }],
  bookCoverUrl: ``,
}

const defaultErrors = {
  title: false,
  annotation: false,
  authors: false,
} 

export class AddBookState {

  private _book = {
    ...defaultBook, 
  }
  private _errors = {
    ...defaultErrors, 
  }

  private _isSaving = false

  constructor() {
    makeAutoObservable(this)
  }

  initialize(book: AddBookType) {
    this._book = {
      ...book,
      authors: book.authors.length > 0 ? book.authors : [{
        fullName: ``, 
      }],
    }
  }

  get book() {
    return this._book
  }

  get errors() {
    return this._errors
  }

  get isSaving() {
    return this._isSaving
  }
  
  addAuthor() {
    this._book.authors.push({
      fullName: ``, 
    })
  }

  removeAuthor(index: number) {
    this._book.authors = this._book.authors.filter((_, i) => i !== index)
  }

  reset() {
    this._book = {
      ...defaultBook, 
    }
    this._errors = {
      ...defaultErrors, 
    }
  }

  validate() { //isvalid
    this._errors.title = this._book.title.trim() === ``
    this._errors.annotation = this._book.annotation.trim() === ``
    this._errors.authors = this._book.authors.every(author => author.fullName.trim() === ``)

    return !Object.values(this._errors)
      .some(Boolean)
  }
  // in prop
  isSomethingFilledWithinTheForm = () => {
    return (
      this._book.title !== `` ||
      this._book.count > 1 ||
      this._book.annotation !== `` ||
      this._book.authors.some(author => author.fullName.trim() !== ``) ||
      this._book.bookCoverUrl !== ``
    )
  }

  setIsSaving() {
    this._isSaving = true
  }

  setIsSaved() {
    this._isSaving = false
  }
}
