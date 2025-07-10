/* eslint-disable array-bracket-newline */
import { makeAutoObservable } from 'mobx'

export class BookState {
  private _book: BookType = {
    id: 1,
    title: ``,
    annotation: ``,
    count: 1,
    language: `rus`,
    authors: [],
    bookCoverUrl: ``,
  }

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    loadedBook,
  }: {
    loadedBook: BookType,
  }) {
    this._book = loadedBook 
  }

  get id() {
    return this._book.id
  }

  get title() {
    return this._book.title
  }

  get annotation() {
    return this._book.annotation
  }

  get count() {
    return this._book.count
  }

  get language() {
    return this._book.language
  }

  get authors() {
    return this._book.authors
  }

  get bookCoverUrl() {
    return this._book.bookCoverUrl
  }
}
