import { makeAutoObservable } from 'mobx'

export class AllBooksState {
  private _booksCards: BookCardType[] = []
  private _query: string = ``

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    booksCards,
  }: {
    booksCards: BookCardType[],
  }) {
    this._booksCards = booksCards
  }

  get query() {
    return this._query
  }

  get booksCards() {
    return this._booksCards
  }

  get filteredBooks() {
    if (this._query.length === 0) return this._booksCards

    const lower = this._query.toLowerCase()
    return this._booksCards.filter((book) =>
      book
        .title
        .toLowerCase()
        .includes(lower) ||
      book.authors.some((author) =>
        author
          .fullName
          .toLowerCase()
          .includes(lower),
      ),
    )
  }

  setQuery(query: string) {
    this._query = query
  }
}