import { makeAutoObservable } from "mobx"

export class ScanState {
  private _scanUrl: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get scanUrl() {
    return this._scanUrl
  }

  getInfoScan(info: string | null) {
    this._scanUrl = info
  }
}
