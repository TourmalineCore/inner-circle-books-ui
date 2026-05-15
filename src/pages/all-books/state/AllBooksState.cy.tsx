import { AllBooksState } from "./AllBooksState"

describe(`AllBooksState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Query`, queryTests)
  describe(`Selected areas`, selectedAreasTests)
  describe(`Knowledge areas`, knowledgeAreasTests)
  describe(`Filtered books`, filteredBooksTests)
})

function initializationTests() {
  it(`
  GIVEN initial state with no books cards
  WHEN ask for them
  SHOULD return an empty array
  `, () => {
    const {
      allBooksState,
    } = createState()

    expect(allBooksState.booksCards).to.deep.eq([])
  })

  it(`
  GIVEN initial state with no books cards
  WHEN initialize it with two books cards
  SHOULD return them from books cards
  `, () => {
    const booksCardsForInitialization = [
      {
        id: 1,
        title: `First Fizz`,
        annotation: `Annotation`,
        language: `English`,
        authors: [
          {
            fullName: `Алекс Остервальдер`,
          },
        ],
        knowledgeAreas: [
          {
            name: `Backend`,
          },
        ],
        coverUrl: `url-1`,
      },
      {
        id: 2,
        title: `Разработка ценностных предложений`,
        annotation: `Аннотация`,
        language: `Russian`,
        authors: [
          {
            fullName: `Сергей Николенко`,
          },
        ],
        knowledgeAreas: [
          {
            name: `Frontend`,
          },
        ],
        coverUrl: `url-2`,
      },
    ]

    const {
      allBooksState,
    } = createState({
      booksCardsForInitialization,
    })

    expect(allBooksState.booksCards).to.deep.eq(booksCardsForInitialization)
  })
}

function queryTests() {
  it(`
  GIVEN initial state
  WHEN ask for query
  SHOULD return an empty string
  `, () => {
    const {
      allBooksState,
    } = createState()

    expect(allBooksState.query).to.eq(``)
  })

  it(`
  GIVEN initial state
  WHEN set a query
  SHOULD return the same query
  `, () => {
    const {
      allBooksState, 
    } = createState()

    allBooksState.setQuery(`Fizz`)

    expect(allBooksState.query).to.eq(`Fizz`)
  })

  it(`
  GIVEN state with a query
  WHEN set an empty query
  SHOULD return an empty string
  `, () => {
    const {
      allBooksState, 
    } = createState()

    allBooksState.setQuery(`Fizz`)
    allBooksState.setQuery(``)

    expect(allBooksState.query).to.eq(``)
  })
}

function selectedAreasTests() {
  it(`
  GIVEN initial state
  WHEN ask for selected areas
  SHOULD return empty set
  `, () => {
    const {
      allBooksState,
    } = createState()

    expect(Array.from(allBooksState.selectedAreas)).to.deep.eq([])
  })

  it(`
  GIVEN initial state
  WHEN toggle knowledgeArea
  SHOULD add knowledgeArea to selected areas
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.onToggleArea(`Backend`)

    expect(Array.from(allBooksState.selectedAreas)).to.deep.eq([
      `Backend`,
    ])
  })

  it(`
  GIVEN selected knowledgeArea
  WHEN toggle same knowledgeArea again
  SHOULD remove knowledgeArea from selected areas
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.onToggleArea(`Backend`)
    allBooksState.onToggleArea(`Backend`)

    expect(Array.from(allBooksState.selectedAreas)).to.deep.eq([])
  })

  it(`
  GIVEN selected areas
  WHEN reset filters
  SHOULD clear selected areas
  `, () => {
    const {
      allBooksState,
    } = createState()

    allBooksState.onToggleArea(`Backend`)
    allBooksState.onToggleArea(`Frontend`)

    allBooksState.resetFilters()

    expect(Array.from(allBooksState.selectedAreas)).to.deep.eq([])
  })
}

function knowledgeAreasTests() {
  it(`
  GIVEN books with duplicated knowledge areas
  WHEN ask for knowledge areas
  SHOULD return unique areas
  `, () => {
    const booksCardsForInitialization = [
      {
        id: 1,
        title: `Clean Code`,
        annotation: `Annotation`,
        language: `English`,
        authors: [
          {
            fullName: `Robert Martin`,
          },
        ],
        knowledgeAreas: [
          {
            name: `Backend`,
          },
        ],
        coverUrl: `url-1`,
      },
      {
        id: 2,
        title: `React Patterns`,
        annotation: `Annotation`,
        language: `English`,
        authors: [
          {
            fullName: `Michael Chan`,
          },
        ],
        knowledgeAreas: [
          {
            name: `Frontend`,
          },
          {
            name: `Backend`,
          },
        ],
        coverUrl: `url-2`,
      },
    ]

    const {
      allBooksState,
    } = createState({
      booksCardsForInitialization,
    })

    expect(allBooksState.knowledgeAreas).to.deep.eq([
      `Backend`,
      `Frontend`,
    ])
  })
}

function filteredBooksTests() {
  const booksCardsForInitialization = [
    {
      id: 1,
      title: `Clean Code`,
      annotation: `Annotation`,
      language: `English`,
      authors: [
        {
          fullName: `Robert Martin`,
        },
      ],
      knowledgeAreas: [
        {
          name: `Backend`,
        },
      ],
      coverUrl: `url-1`,
    },
    {
      id: 2,
      title: `Clean Architecture`,
      annotation: `Annotation`,
      language: `English`,
      authors: [
        {
          fullName: `Robert Martin`,
        },
      ],
      knowledgeAreas: [
        {
          name: `Architecture`,
        },
        {
          name: `Backend`,
        },
      ],
      coverUrl: `url-2`,
    },
    {
      id: 3,
      title: `The Pragmatic Programmer`,
      annotation: `Annotation`,
      language: `English`,
      authors: [
        {
          fullName: `David Thomas`,
        },
      ],
      knowledgeAreas: [
        {
          name: `Frontend`,
        },
      ],
      coverUrl: `url-3`,
    },
  ]

  it(`
  GIVEN state with books and an empty query
  WHEN ask for filtered books
  SHOULD return all books
  `, () => {
    const {
      allBooksState, 
    } = createState({
      booksCardsForInitialization, 
    })

    expect(allBooksState.filteredBooks).to.deep.eq(booksCardsForInitialization)
  })

  it(`
  GIVEN state with books
  WHEN set a query that matches part of a title
  SHOULD return only matching books
  `, () => {
    const {
      allBooksState, 
    } = createState({
      booksCardsForInitialization, 
    })

    allBooksState.setQuery(`Clean`)

    expect(allBooksState.filteredBooks).to.deep.eq([
      booksCardsForInitialization[0],
      booksCardsForInitialization[1],
    ])
    
    allBooksState.setQuery(`Pragmatic`)

    expect(allBooksState.filteredBooks).to.deep.eq([
      booksCardsForInitialization[2],
    ])
  })

  it(`
  GIVEN state with books
  WHEN set a query that matches an author name
  SHOULD return only books by that author
  `, () => {
    const {
      allBooksState, 
    } = createState({
      booksCardsForInitialization, 
    })

    allBooksState.setQuery(`David`)

    expect(allBooksState.filteredBooks).to.deep.eq([
      booksCardsForInitialization[2],
    ])
  })

  it(`
  GIVEN state with books
  WHEN set a query in different case
  SHOULD match regardless of case
  `, () => {
    const {
      allBooksState, 
    } = createState({
      booksCardsForInitialization, 
    })

    allBooksState.setQuery(`cLeAn cOdE`)

    expect(allBooksState.filteredBooks).to.deep.eq([
      booksCardsForInitialization[0],
    ])
  })

  it(`
  GIVEN state with books
  WHEN set a query that matches nothing
  SHOULD return an empty array
  `, () => {
    const {
      allBooksState, 
    } = createState({
      booksCardsForInitialization, 
    })

    allBooksState.setQuery(`Zzz None`)

    expect(allBooksState.filteredBooks).to.deep.eq([])
  })

  it(`
  GIVEN state with no books
  WHEN set any query
  SHOULD return an empty array
  `, () => {
    const {
      allBooksState, 
    } = createState()

    allBooksState.setQuery(`Clean`)

    expect(allBooksState.filteredBooks).to.deep.eq([])
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

    allBooksState.onToggleArea(`Backend`)

    expect(allBooksState.filteredBooks).to.deep.eq([
      booksCardsForInitialization[0],
      booksCardsForInitialization[1],
    ])
  })

  it(`
  GIVEN books
  WHEN set query and knowledgeArea filter
  SHOULD return books matching both filters
  `, () => {
    const {
      allBooksState,
    } = createState({
      booksCardsForInitialization,
    })

    allBooksState.setQuery(`Architecture`)
    allBooksState.onToggleArea(`Backend`)

    expect(allBooksState.filteredBooks).to.deep.eq([
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

    allBooksState.onToggleArea(`Backend`)

    allBooksState.resetFilters()

    expect(allBooksState.filteredBooks).to.deep.eq(
      booksCardsForInitialization,
    )
  })
}

function createState({
  booksCardsForInitialization,
}: {
  booksCardsForInitialization: unknown[], 
} = {
  booksCardsForInitialization: [],
}) {
  const allBooksState = new AllBooksState()

  allBooksState.initialize({
    booksCards: booksCardsForInitialization as BookCardType[],
  })

  return {
    allBooksState,
  }
}
