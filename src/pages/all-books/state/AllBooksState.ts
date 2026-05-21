import { makeAutoObservable } from 'mobx'

export class AllBooksState {
  private _booksCards: BookCardType[] = []
  private _searchQuery: string = ``
  private _knowledgeAreas: KnowledgeArea[] = []
  private _selectedAreasIds: number[] = []
  private _previouslySelectedAreasIds: number[] = []

  constructor() {
    makeAutoObservable(this)
  }

  initializeBooks({
    booksCards,
  }: {
    booksCards: BookCardType[],
  }) {
    this._booksCards = booksCards
  }

  initializeKnowledgeAreas({
    knowledgeAreas,
  }: {
    knowledgeAreas: KnowledgeArea[],
  }) {
    this._knowledgeAreas = knowledgeAreas
  }

  get searchQuery() {
    return this._searchQuery
  }

  get selectedAreasIds() {
    return this._selectedAreasIds
  }

  get previouslySelectedAreasIds() {
    return this._previouslySelectedAreasIds
  }

  get knowledgeAreas() {
    return this._knowledgeAreas
  }

  get filteredBooks() {
    let result = this._booksCards

    if (this._searchQuery) {
      const lowerCaseSearchQuery = this._searchQuery.toLowerCase()

      result = result.filter((book) =>
        book.title
          .toLowerCase()
          .includes(lowerCaseSearchQuery) ||
      book.authors.some((author) =>
        author.fullName
          .toLowerCase()
          .includes(lowerCaseSearchQuery),
      ),
      )
    }

    if (this._selectedAreasIds.length) {
      result = result.filter((book) =>
        book.knowledgeAreas.some((knowledgeArea: KnowledgeArea) =>
          this._selectedAreasIds.includes(knowledgeArea.id),
        ),
      )
    }

    return result
  }
  
  setSearchQuery(searchQuery: string) {
    this._searchQuery = searchQuery
  }

  toggleKnowledgeArea({
    knowledgeAreaId,
  } : {
    knowledgeAreaId: number,
  }) {
    const indexOfKnowledgeAreaIdAmongSelected = this._selectedAreasIds.indexOf(knowledgeAreaId)

    if (indexOfKnowledgeAreaIdAmongSelected === -1) {
      this._selectedAreasIds.push(knowledgeAreaId)
    }
    else {
      this._selectedAreasIds.splice(indexOfKnowledgeAreaIdAmongSelected, 1)
    }
  }

  // call when click back button
  resetToPreviouslySelectedAreas() {
    this._selectedAreasIds = [
      ...this._previouslySelectedAreasIds,
    ] 
  }

  // apply method for mobile 
  applySelectedAreas() {
    this._previouslySelectedAreasIds = [
      ...this._selectedAreasIds,
    ]
  }

  resetFilters() {
    this._selectedAreasIds = []
  }
}