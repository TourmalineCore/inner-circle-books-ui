import { AllBooksState } from "./AllBooksState"

describe(`AllBooksState`, () => {
  describe(`Initialization`, initializationTests)
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
