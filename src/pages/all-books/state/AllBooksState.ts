import { makeAutoObservable } from 'mobx'

export class AllBooksState {
  private _booksCards: BookCardType[] = []
  private _query = ``
  private _selectedAreas = new Set<string>()

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

  get selectedAreas() {
    return this._selectedAreas
  }

  get knowledgeAreas() {
    return [
      ...new Set(
        this._booksCards.flatMap((book) =>
          book.knowledgeAreas.map((knowledgeArea: KnowledgeArea) => knowledgeArea.name),
        ),
      ),
    ]
  }

  get filteredBooks() {
    let result = this._booksCards

    if (this._query) {
      const lowerCaseQuery = this._query.toLowerCase()

      result = result.filter((book) =>
        book.title
          .toLowerCase()
          .includes(lowerCaseQuery) ||
      book.authors.some((author) =>
        author.fullName
          .toLowerCase()
          .includes(lowerCaseQuery),
      ),
      )
    }

    if (this._selectedAreas.size) {
      result = result.filter((book) =>
        book.knowledgeAreas.some((knowledgeArea: KnowledgeArea) =>
          this._selectedAreas.has(knowledgeArea.name),
        ),
      )
    }

    return result
  }

  setQuery(query: string) {
    this._query = query
  }

  onToggleArea(knowledgeArea: string) {
    if (this._selectedAreas.has(knowledgeArea)) {
      this._selectedAreas.delete(knowledgeArea)
    }
    else {
      this._selectedAreas.add(knowledgeArea)
    }
  }

  resetFilters() {
    this._selectedAreas.clear()
  }
}