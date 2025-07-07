import { BookCard } from "./BookCard"

describe(`BookCard`, () => {
  describe(`Author suffix`, authorSuffixTests)
  describe(`Images changes`, imagesTest)
})

function imagesTest() {
  it(`
  GIVEN an empty image URL
  WHEN the card renders
  SHOULD render the default image
  `, () => {
    mountComponent({
      bookCoverUrl: ``,
      authors: [
        {
          fullName: `Александр Остервальдер`,
        },
      ],
    })

    cy
      .getByData(`card-image`)
      .should(`have.attr`, `src`)
      .and(`include`, `no-image.png`)
  })

  it(`
  GIVEN a broken image URL
  WHEN the image fails to load
  SHOULD render the default image
  `, () => {
    mountComponent({
      bookCoverUrl: `https://this-does-not-exist.invalid/image.jpg`,
      authors: [
        {
          fullName: `Александр Остервальдер`,
        },
      ],
    })

    cy
      .getByData(`card-image`)
      .should(`have.attr`, `src`)
      .and(`include`, `no-image.png`)
  })
}

function authorSuffixTests() {
  it(`
  GIVEN 2 authors and language = rus
  WHEN render the component
  SHOULD see "и др." after first author
  `, () => {
    mountComponent({
      authors: [
        {
          fullName: `Александр Остервальдер`,
        },
        {
          fullName: `Сергей Николенко`,
        },
      ],
    })

    cy.contains(`Александр Остервальдер и др.`)
  })

  it(`
  GIVEN 2 authors and language = eng
  WHEN render the component
  SHOULD see "and etc." after first author
  `, () => {
    mountComponent({
      authors: [
        {
          fullName: `Alexander Osterwalder`,
        },
        {
          fullName: `Yves Pigneur`,
        },
      ],
      language: `eng`,
    })

    cy.contains(`Alexander Osterwalder and etc.`)
  })

  it(`
  GIVEN 1 author
  WHEN render the component
  SHOULD NOT see suffix
  `, () => {
    mountComponent({
      authors: [
        {
          fullName: `Alexander Osterwalder`,
        },
      ],
    })

    cy.contains(`Alexander Osterwalder`)
  })
}

function mountComponent({
  bookCoverUrl = ``,
  title = `Test Title`,
  authors,
  language = `rus`,
}: Partial<BookCardType> & { 
  authors: BookCardType["authors"], 
  language?: BookCardType["language"], 
}) {
  
  cy
    .mount(
      <BookCard
        bookCoverUrl={bookCoverUrl}
        title={title}
        authors={authors}
        language={language}
      />,
    )
}
