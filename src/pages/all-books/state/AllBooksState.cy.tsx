import { AllBooksState } from "./AllBooksState"
import { AvailabilityStatus } from "../../../common/enums/availabilityStatus"

describe(`AllBooksState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Search query`, searchQueryTests)
  describe(`Selected knowledge areas`, selectedKnowledgeAreasTests)
  describe(`Previously selected knowledge areas`, previouslySelectedKnowledgeAreasTests)
  describe(`In office filter`, inOfficeFilterTests)
  describe(`Filtered books`, filteredBooksTests)
  describe(`Loading`, loadingTests)
})

function initializationTests() {
  it(`
  GIVEN initial state with default values
  WHEN ask for them
  SHOULD return default values
  `, () => {
    const {
      allBooksState,
    } = createState()

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([])

    expect(allBooksState.knowledgeAreas)
      .to
      .deep
      .eq([])

    expect(allBooksState.selectedAreasIds)
      .to
      .deep
      .eq([])

    expect(allBooksState.previouslySelectedAreasIds)
      .to
      .deep
      .eq([])

    expect(allBooksState.searchQuery)
      .to
      .eq(``)

    expect(allBooksState.isLoading)
      .to
      .eq(false)

    expect(allBooksState.isInOfficeOnly)
      .to
      .eq(false)

    expect(allBooksState.hasActiveFilters)
      .to
      .eq(false)
  })

  it(`
  GIVEN initial state with no books cards
  WHEN initialize it with a book card
  SHOULD return an array with this book card
  `, () => {
    const booksCardsForInitialization = [
      {
        id: 1,
      },
    ]

    const {
      allBooksState,
    } = createState({
      booksCardsForInitialization,
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq(booksCardsForInitialization)
  })

  it(`
  GIVEN initial state with no knowledge areas
  WHEN initialize it with one knowledge area
  SHOULD return an array with this knowledge area
  `, () => {
    const knowledgeAreasForInitialization = [
      {
        id: 1,
      },
    ]

    const {
      allBooksState,
    } = createState({
      knowledgeAreasForInitialization,
    })

    expect(allBooksState.knowledgeAreas)
      .to
      .deep
      .eq(knowledgeAreasForInitialization)
  })
}

function searchQueryTests() {
  it(`
  GIVEN initial state
  WHEN set a search query
  SHOULD return the same search query
  `, () => {
    const {
      allBooksState, 
    } = createState()

    allBooksState.setSearchQuery({
      searchQuery: `Fizz`,
    })

    expect(allBooksState.searchQuery)
      .to
      .eq(`Fizz`)
  })

  it(`
  GIVEN state with a search query
  WHEN set an empty search query
  SHOULD return an empty string
  `, () => {
    const {
      allBooksState, 
    } = createState()

    allBooksState.setSearchQuery({
      searchQuery: `Fizz`,
    })
    allBooksState.setSearchQuery({
      searchQuery: ``,
    })

    expect(allBooksState.searchQuery)
      .to
      .eq(``)
  })
}

function selectedKnowledgeAreasTests() {
  it(`
  GIVEN initial state
  WHEN toggle knowledgeArea
  SHOULD add knowledgeArea to selected areas
  AND have active filters
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })

    expect(allBooksState.selectedAreasIds)
      .to
      .deep
      .eq([
        1,
      ])

    expect(allBooksState.hasActiveFilters)
      .to
      .eq(true)
  })

  it(`
  GIVEN selected knowledgeArea
  WHEN toggle same knowledgeArea again
  SHOULD remove knowledgeArea from selected areas
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })
    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })

    expect(allBooksState.selectedAreasIds)
      .to
      .deep
      .eq([])
  })

  it(`
  GIVEN selected areas and turned on in office filter
  WHEN reset filters
  SHOULD not have active filters
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })
    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 2,
    })
    allBooksState.toggleInOfficeOnly()

    allBooksState.resetFilters()

    expect(allBooksState.selectedAreasIds)
      .to
      .deep
      .eq([])

    expect(allBooksState.isInOfficeOnly)
      .to
      .eq(false)

    expect(allBooksState.hasActiveFilters)
      .to
      .eq(false)
  })

}

function previouslySelectedKnowledgeAreasTests() {
  it(`
  GIVEN selected areas
  WHEN apply filters
  SHOULD add knowledge areas to previously selected areas ids
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })
  
    allBooksState.applyFilters()

    expect(allBooksState.previouslySelectedAreasIds)
      .to
      .deep
      .eq([
        1,
      ])
  })

  it(`
  GIVEN selected areas
  WHEN apply filters
  AND reset filters
  SHOULD add knowledge areas to previously selected areas ids but not to selected areas ids
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })

    expect(allBooksState.selectedAreasIds)
      .to
      .deep
      .eq([
        1,
      ])
  
    allBooksState.applyFilters()

    allBooksState.resetFilters()

    expect(allBooksState.previouslySelectedAreasIds)
      .to
      .deep
      .eq([
        1,
      ])

    expect(allBooksState.selectedAreasIds)
      .to
      .deep
      .eq([])
  })

  it(`
  GIVEN selected knowledge areas
  WHEN apply filters
  AND choose more selected knowledge areas
  SHOULD add knowledge areas to selected areas ids but previosuly selected areas ids should remain unchanged
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })
  
    allBooksState.applyFilters()

    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 2,
    })

    expect(allBooksState.previouslySelectedAreasIds)
      .to
      .deep
      .eq([
        1,
      ])

    expect(allBooksState.selectedAreasIds)
      .to
      .deep
      .eq([
        1,
        2,
      ])
  })
}

function filteredBooksTests() {
  const booksCardsForInitialization = [
    {
      id: 1,
      title: `Clean Code`,
      authors: [
        {
          fullName: `Robert Martin`,
        },
      ],
      knowledgeAreas: [
        {
          id: 1,
        },
      ],
      availabilityStatuses: [
        AvailabilityStatus.OnHand,
      ],
    },
    {
      id: 2,
      title: `Clean Architecture`,
      authors: [
        {
          fullName: `Robert Martin`,
        },
      ],
      knowledgeAreas: [
        {
          id: 1,
        },
        {
          id: 3,
        },
      ],
      availabilityStatuses: [
        AvailabilityStatus.OnYou,
        AvailabilityStatus.InOffice,
      ],
    },
    {
      id: 3,
      title: `The Pragmatic Programmer`,
      authors: [
        {
          fullName: `David Thomas`,
        },
      ],
      knowledgeAreas: [
        {
          id: 2,
        },
      ],
      availabilityStatuses: [
        AvailabilityStatus.InOffice,
      ],
    },
  ]

  it(`
  GIVEN state with books and an empty search query
  WHEN ask for filtered books
  SHOULD return all books
  `, () => {
    const {
      allBooksState, 
    } = createState({
      booksCardsForInitialization, 
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq(booksCardsForInitialization)
  })

  it(`
  GIVEN state with books
  WHEN set a search query that matches part of a title
  SHOULD return only matching books
  `, () => {
    const {
      allBooksState, 
    } = createState({
      booksCardsForInitialization, 
    })

    allBooksState.setSearchQuery({
      searchQuery: `Clean`,
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([
        booksCardsForInitialization[0],
        booksCardsForInitialization[1],
      ])
    
    allBooksState.setSearchQuery({
      searchQuery: `Pragmatic`,
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([
        booksCardsForInitialization[2],
      ])
  })

  it(`
  GIVEN state with books
  WHEN set a search query that matches an author name
  SHOULD return only books by that author
  `, () => {
    const {
      allBooksState, 
    } = createState({
      booksCardsForInitialization, 
    })

    allBooksState.setSearchQuery({
      searchQuery: `David`,
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([
        booksCardsForInitialization[2],
      ])
  })

  it(`
  GIVEN state with books
  WHEN set a search query in different case
  SHOULD match regardless of case
  `, () => {
    const {
      allBooksState, 
    } = createState({
      booksCardsForInitialization, 
    })

    allBooksState.setSearchQuery({
      searchQuery: `cLeAn cOdE`,
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([
        booksCardsForInitialization[0],
      ])
  })

  it(`
  GIVEN state with books
  WHEN set a search query that matches nothing
  SHOULD return an empty array
  `, () => {
    const {
      allBooksState, 
    } = createState({
      booksCardsForInitialization, 
    })

    allBooksState.setSearchQuery({
      searchQuery: `Zzz None`,
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([])
  })

  it(`
  GIVEN state with no books
  WHEN set any search query
  SHOULD return an empty array
  `, () => {
    const {
      allBooksState, 
    } = createState()

    allBooksState.setSearchQuery({
      searchQuery: `Clean`,
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([])
  })

  it(`
  GIVEN books with different knowledge areas
  WHEN toggle knowledgeArea filter
  SHOULD return only matching books
  `, () => {
    const {
      allBooksState,
    } = createState({
      booksCardsForInitialization,
    })

    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([
        booksCardsForInitialization[0],
        booksCardsForInitialization[1],
      ])
  })

  it(`
  GIVEN books
  WHEN set a search query and knowledgeArea filter
  SHOULD return books matching both filters
  `, () => {
    const {
      allBooksState,
    } = createState({
      booksCardsForInitialization,
    })

    allBooksState.setSearchQuery({
      searchQuery: `Architecture`,
    })
    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([
        booksCardsForInitialization[1],
      ])
  })

  it(`
  GIVEN books with different availability statuses
  WHEN turn on in office filter
  SHOULD return only books that have in office status, including the ones that are also on you
  `, () => {
    const {
      allBooksState,
    } = createState({
      booksCardsForInitialization,
    })

    allBooksState.toggleInOfficeOnly()

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([
        booksCardsForInitialization[1],
        booksCardsForInitialization[2],
      ])
  })

  it(`
  GIVEN books
  WHEN turn on in office filter and set knowledgeArea filter
  SHOULD return books matching both filters
  `, () => {
    const {
      allBooksState,
    } = createState({
      booksCardsForInitialization,
    })

    allBooksState.toggleInOfficeOnly()
    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq([
        booksCardsForInitialization[1],
      ])
  })

  it(`
  GIVEN active knowledgeArea filters
  WHEN reset filters
  SHOULD return all books again
  `, () => {
    const {
      allBooksState,
    } = createState({
      booksCardsForInitialization,
    })

    allBooksState.toggleKnowledgeArea({
      knowledgeAreaId: 1,
    })

    allBooksState.resetFilters()

    expect(allBooksState.filteredBooks)
      .to
      .deep
      .eq(
        booksCardsForInitialization,
      )
  })
}

function inOfficeFilterTests() {
  it(`
  GIVEN initial state
  WHEN toggle in office filter twice
  SHOULD turn it on and then off
  AND have active filters only while it is on
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.toggleInOfficeOnly()

    expect(allBooksState.isInOfficeOnly)
      .to
      .eq(true)

    expect(allBooksState.hasActiveFilters)
      .to
      .eq(true)

    allBooksState.toggleInOfficeOnly()

    expect(allBooksState.isInOfficeOnly)
      .to
      .eq(false)

    expect(allBooksState.hasActiveFilters)
      .to
      .eq(false)
  })

  it(`
  GIVEN applied in office filter
  WHEN turn it off
  AND reset to previously applied filters
  SHOULD turn it on again
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.toggleInOfficeOnly()
    allBooksState.applyFilters()

    allBooksState.toggleInOfficeOnly()
    allBooksState.resetToPreviouslyAppliedFilters()

    expect(allBooksState.isInOfficeOnly)
      .to
      .eq(true)
  })

  it(`
  GIVEN not applied in office filter
  WHEN turn it on
  AND reset to previously applied filters
  SHOULD turn it off
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.toggleInOfficeOnly()
    allBooksState.resetToPreviouslyAppliedFilters()

    expect(allBooksState.isInOfficeOnly)
      .to
      .eq(false)
  })
}

function loadingTests() {
  it(`
  GIVEN isLoading is false
  WHEN setIsLoading is called with true
  THEN isLoading should become true
  `, () => {
    const {
      allBooksState,
    } = createState()

    expect(allBooksState.isLoading)
      .to
      .eq(false)

    allBooksState.setIsLoading({
      isLoading: true,
    })

    expect(allBooksState.isLoading)
      .to
      .eq(true)
  })
}

function createState({
  booksCardsForInitialization,
  knowledgeAreasForInitialization,
}: {
  booksCardsForInitialization?: unknown[], 
  knowledgeAreasForInitialization?: unknown[], 
} = {
  booksCardsForInitialization: [],
  knowledgeAreasForInitialization: [],
}) {
  const allBooksState = new AllBooksState()

  allBooksState.initializeBooks({
    booksCards: booksCardsForInitialization as BookCardType[],
  })

  allBooksState.initializeKnowledgeAreas({
    knowledgeAreas: knowledgeAreasForInitialization as KnowledgeArea[],
  })

  return {
    allBooksState,
  }
}
