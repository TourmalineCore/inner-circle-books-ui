import { makeAutoObservable } from 'mobx'

const defaultBook: BookType = {
  id: 1,
  title: ``,
  annotation: ``,
  count: 1,
  language: `ru`,
  authors: [
    {
      fullName: ``, 
    },
  ],
  bookCoverUrl: ``,
}

export class BookState {
  private _book: BookType = {
    ...defaultBook, 
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

  get book() {
    return this._book
  }
}
