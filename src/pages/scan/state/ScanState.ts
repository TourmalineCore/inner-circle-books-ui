import { makeAutoObservable } from "mobx"

export class ScanState {
  private _scanUrl: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get scanUrl() {
    return this._scanUrl
  }

  setScanUrl({
    url,
  }: {
    url: string,
  }) {
    this._scanUrl = url
  }

  resetScanUrl() {
    this._scanUrl = null
  }
}
