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
      authors: [
        {
          fullName: `Александр Остервальдер`,
        },
      ],
      coverUrl: ``,
    })

    cy
      .getByData(`book-card-image`)
      .should(`have.attr`, `src`)
      .and(`include`, `no-image.png`)
  })

  it(`
  GIVEN a broken image URL
  WHEN the image fails to load
  SHOULD render the default image
  `, () => {
    mountComponent({
      authors: [
        {
          fullName: `Александр Остервальдер`,
        },
      ],
      coverUrl: `https://book.jpg`,
    })

    cy
      .getByData(`book-card-image`)
      .should(`have.attr`, `src`)
      .and(`include`, `no-image.png`)
  })
}

function authorSuffixTests() {
  it(`
  GIVEN 2 authors and language = ru
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
  GIVEN 2 authors and language = en
  WHEN render the component
  SHOULD see "and etc." after first author
  `, () => {
    mountComponent({
      language: `en`,
      authors: [
        {
          fullName: `Alexander Osterwalder`,
        },
        {
          fullName: `Yves Pigneur`,
        },
      ],
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
  title = `Test Title`,
  language = `ru`,
  authors,
  coverUrl = ``,
}: Partial<BookCardType> & { 
  authors: BookCardType["authors"], 
  language?: BookCardType["language"], 
}) {
  
  cy
    .mount(
      <BookCard
        title={title}
        language={language}
        authors={authors}
        coverUrl={coverUrl}
      />,
    )
}
