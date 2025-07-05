import { makeAutoObservable } from 'mobx'

export class BookCardsState {
  private _booksCards: BookCardType[] = []

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

  get booksCards() {
    return this._booksCards
  }
}
