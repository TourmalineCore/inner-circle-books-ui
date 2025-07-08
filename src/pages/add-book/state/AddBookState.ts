/* eslint-disable array-bracket-newline */
import { makeAutoObservable } from 'mobx'

export class AddBookState {
  private _initBook = {
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
    this._initBook.title = title
    this._initBook.count = count
    this._initBook.language = language
    this._initBook.annotation = annotation
    this._initBook.authors = authors.length > 0
      ? authors
      : [{
        fullName: ``, 
      }]
    this._initBook.bookCoverUrl = bookCoverUrl
  }

  get title() {
    return this._initBook.title
  }

  get count() {
    return this._initBook.count
  }

  get language() {
    return this._initBook.language
  }

  get annotation() {
    return this._initBook.annotation
  }

  get authors() {
    return this._initBook.authors
  }

  get bookCoverUrl() {
    return this._initBook.bookCoverUrl
  }

  get errors() {
    return this._errors
  }

  get isSaving() {
    return this._isSaving
  }

  setTitle(value: string) {
    this._initBook.title = value
  }

  setCount(value: number) {
    this._initBook.count = value
  }

  setLanguage(value: string) {
    this._initBook.language = value
  }

  setAnnotation(value: string) {
    this._initBook.annotation = value
  }

  setCoverUrl(value: string) {
    this._initBook.bookCoverUrl = value
  }

  setAuthor(index: number, value: string) {
    this._initBook.authors[index].fullName = value
  }

  addAuthor() {
    this._initBook.authors.push({
      fullName: ``, 
    })
  }

  removeAuthor(index: number) {
    this._initBook.authors = this._initBook.authors.filter((_, i) => i !== index)
  }

  reset() {
    this._initBook.title = ``
    this._initBook.count = 1
    this._initBook.language = `rus`
    this._initBook.annotation = ``
    this._initBook.authors = [{
      fullName: ``, 
    }]
    this._initBook.bookCoverUrl = ``
    this._errors = {
      title: false,
      annotation: false,
      authors: false,
    }
  }

  validate() { //isvalid
    this._errors.title = this._initBook.title.trim() === ``
    this._errors.annotation = this._initBook.annotation.trim() === ``
    this._errors.authors = this._initBook.authors.every(author => author.fullName.trim() === ``)

    return !Object.values(this._errors)
      .some(Boolean)
  }
  // in prop
  isSomethingFilledWithinTheForm = () => {
    return (
      this._initBook.title !== `` ||
      this._initBook.count > 1 ||
      this._initBook.annotation !== `` ||
      this._initBook.authors.some(author => author.fullName.trim() !== ``) ||
      this._initBook.bookCoverUrl !== ``
    )
  }

  setIsSaving() {
    this._isSaving = true
  }

  setIsSaved() {
    this._isSaving = false
  }
}
