/* eslint-disable array-bracket-newline */
import { makeAutoObservable } from 'mobx'

export class AddBookState {
  private _title = ``
  private _count = 1
  private _language = `rus`
  private _annotation = ``
  private _authors = [``]
  private _coverUrl = ``

  private _errors = {
    title: false,
    annotation: false,
    authors: false,
  }

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    title,
    count,
    language,
    annotation,
    authors,
    coverUrl,
  }: AddBookType) {
    this._title = title
    this._count = count
    this._language = language
    this._annotation = annotation
    this._authors = authors.length > 0 
      ? authors 
      : [``]
    this._coverUrl = coverUrl
  }

  get title() {
    return this._title
  }

  get count() {
    return this._count
  }

  get language() {
    return this._language
  }

  get annotation() {
    return this._annotation
  }

  get authors() {
    return this._authors
  }

  get coverUrl() {
    return this._coverUrl
  }

  get errors() {
    return this._errors
  }

  setTitle(value: string) {
    this._title = value
  }

  setCount(value: number) {
    this._count = value
  }

  setLanguage(value: string) {
    this._language = value
  }

  setAnnotation(value: string) {
    this._annotation = value
  }

  setCoverUrl(value: string) {
    this._coverUrl = value
  }

  setAuthor(index: number, value: string) {
    this._authors[index] = value
  }

  addAuthor() {
    this._authors.push(``)
  }

  removeAuthor(index: number) {
    this._authors = this._authors.filter((_, i) => i !== index)
  }

  reset() {
    this._title = ``
    this._count = 1
    this._language = `rus`
    this._annotation = ``
    this._authors = [``]
    this._coverUrl = ``
    this._errors = {
      title: false,
      annotation: false,
      authors: false,
    }
  }

  validate() {
    this._errors.title = this._title.trim() === ``
    this._errors.annotation = this._annotation.trim() === ``
    this._errors.authors = this._authors.every((author) => author.trim() === ``)

    return !Object.values(this._errors)
      .some(Boolean)
  }
}
