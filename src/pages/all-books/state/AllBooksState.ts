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

    const lowerCaseQuery = this._query.toLowerCase()
    return this._booksCards.filter((book) =>
      book
        .title
        .toLowerCase()
        .includes(lowerCaseQuery) ||
      book.authors.some((author) =>
        author
          .fullName
          .toLowerCase()
          .includes(lowerCaseQuery),
      ),
    )
  }

  setQuery(query: string) {
    this._query = query
  }
}