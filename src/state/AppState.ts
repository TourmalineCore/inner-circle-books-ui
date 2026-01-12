import { makeAutoObservable } from 'mobx'

export class AppState {
  private _knowledgeAreas: KnowledgeArea[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get knowledgeAreas() {
    return this._knowledgeAreas
  }

  setKnowledgeAreas({
    knowledgeAreas,
  }: {
    knowledgeAreas: KnowledgeArea[],
  }) {
    this._knowledgeAreas = knowledgeAreas
  }
}
