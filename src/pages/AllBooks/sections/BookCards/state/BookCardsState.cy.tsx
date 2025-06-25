import { BookCardsState } from "./BookCardsState"

describe(`BooksCards`, () => {
  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
	GIVEN initial state with no books cards
	WHEN ask for them
	SHOULD return an empty array
	`, () => {
    const {
      booksCards,
    } = createState()

    expect(booksCards.booksCards).to.deep.eq([])
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
        annotation: `Some text`,
        language: `English`,
        authors: [
          {
            fullName: `Author A`, 
          },
        ],
        bookCoverUrl: `url-1`,
      },
      {
        id: 2,
        title: `Second Buzz`,
        annotation: `Another text`,
        language: `French`,
        authors: [
          {
            fullName: `Author B`, 
          },
        ],
        bookCoverUrl: `url-2`,
      },
    ]

    const {
      booksCards,
    } = createState({
      booksCardsForInitialization,
    })

    expect(booksCards.booksCards).to.deep.eq(booksCardsForInitialization)
  })

}

function createState({
  booksCardsForInitialization,
}: {
  booksCardsForInitialization: unknown[], 
} = {
  booksCardsForInitialization: [],
}) {
  const booksCards = new BookCardsState()

  booksCards.initialize({
    booksCards: booksCardsForInitialization as BookCardType[],
  })

  return {
    booksCards,
  }
}
