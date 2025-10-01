import { makeAutoObservable } from "mobx"

export class BookHistoryState {
  private _bookHistory: BookHistoryType[] =[]

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    loadedBookHistory,
  }: {
    loadedBookHistory: BookHistoryType[],
  }) {
    this._bookHistory = loadedBookHistory
  }

  get bookHistory() {
    return this._bookHistory
  }
}