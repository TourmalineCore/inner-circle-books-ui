import { makeAutoObservable } from 'mobx'
import { AvailabilityStatus } from '../../../common/enums/availabilityStatus'

export class AllBooksState {
  private _booksCards: BookCardType[] = []
  private _searchQuery: string = ``
  private _knowledgeAreas: KnowledgeArea[] = []
  private _selectedAreasIds: number[] = []
  private _previouslySelectedAreasIds: number[] = []
  private _isInOfficeOnly = false
  private _previouslyIsInOfficeOnly = false
  private _isLoading = false

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

  get isLoading() {
    return this._isLoading
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

  get isInOfficeOnly() {
    return this._isInOfficeOnly
  }

  get hasActiveFilters() {
    return this._selectedAreasIds.length > 0 || this._isInOfficeOnly
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

    if (this._isInOfficeOnly) {
      result = result.filter((book) =>
        book.availabilityStatuses.includes(AvailabilityStatus.InOffice),
      )
    }

    return result
  }

  setIsLoading({
    isLoading,
  }: {
    isLoading: boolean,
  }) {
    this._isLoading = isLoading
  }
  
  setSearchQuery({
    searchQuery,
  } : {
    searchQuery: string,
  }) {
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

  toggleInOfficeOnly() {
    this._isInOfficeOnly = !this._isInOfficeOnly
  }

  // call when click back button
  resetToPreviouslyAppliedFilters() {
    this._selectedAreasIds = [
      ...this._previouslySelectedAreasIds,
    ] 
    this._isInOfficeOnly = this._previouslyIsInOfficeOnly
  }

  // apply method for mobile 
  applyFilters() {
    this._previouslySelectedAreasIds = [
      ...this._selectedAreasIds,
    ]
    this._previouslyIsInOfficeOnly = this._isInOfficeOnly
  }

  resetFilters() {
    this._selectedAreasIds = []
    this._isInOfficeOnly = false
  }
}