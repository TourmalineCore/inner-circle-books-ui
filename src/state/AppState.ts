import { makeAutoObservable } from 'mobx'
import { api } from '../common/api'

export class AppState {
  private _knowledgeAreas: KnowledgeArea[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get knowledgeAreas() {
    return this._knowledgeAreas
  }

  async fetchAndSetKnowledgeAreas() {
    const {
      data: {
        knowledgeAreas,
      },
    } = await api.get<{ 
        knowledgeAreas: KnowledgeArea[], 
      }>(`/knowledge-areas`)
        
    this._knowledgeAreas = knowledgeAreas
  }
}
