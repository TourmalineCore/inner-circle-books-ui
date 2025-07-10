/* eslint-disable array-bracket-newline */
import { makeAutoObservable } from 'mobx'

export class AddBookState {
  private _book = {
    title: ``,
    count: 1,
    language: `rus`,
    annotation: ``,
    authors: [{
      fullName: ``,
    }],
    bookCoverUrl: ``,
  }

  private _errors = {
    title: false,
    annotation: false,
    authors: false,
  }

  private _isSaving = false

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    title,
    count,
    language,
    annotation,
    authors,
    bookCoverUrl,
  }: AddBookType) {
    this._book.title = title
    this._book.count = count
    this._book.language = language
    this._book.annotation = annotation
    this._book.authors = authors.length > 0
      ? authors
      : [{
        fullName: ``, 
      }]
    this._book.bookCoverUrl = bookCoverUrl
  }

  get title() {
    return this._book.title
  }

  get count() {
    return this._book.count
  }

  get language() {
    return this._book.language
  }

  get annotation() {
    return this._book.annotation
  }

  get authors() {
    return this._book.authors
  }

  get bookCoverUrl() {
    return this._book.bookCoverUrl
  }

  get errors() {
    return this._errors
  }

  get isSaving() {
    return this._isSaving
  }

  setTitle(value: string) {
    this._book.title = value
  }

  setCount(value: number) {
    this._book.count = value
  }

  setLanguage(value: string) {
    this._book.language = value
  }

  setAnnotation(value: string) {
    this._book.annotation = value
  }

  setCoverUrl(value: string) {
    this._book.bookCoverUrl = value
  }

  setAuthor(index: number, value: string) {
    this._book.authors[index].fullName = value
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
    this._book.title = ``
    this._book.count = 1
    this._book.language = `rus`
    this._book.annotation = ``
    this._book.authors = [{
      fullName: ``, 
    }]
    this._book.bookCoverUrl = ``
    this._errors = {
      title: false,
      annotation: false,
      authors: false,
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
