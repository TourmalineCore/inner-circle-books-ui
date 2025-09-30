import { makeAutoObservable } from "mobx"

export class HistoryState {
  private _history: HistoryType[] =[]

  constructor() {
    makeAutoObservable(this)
  }

  initialize({
    loadedHistory,
  }: {
    loadedHistory: HistoryType[],
  }) {
    this._history = loadedHistory
  }

  get history() {
    return this._history
  }
}