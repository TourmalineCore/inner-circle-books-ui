/// <reference types="cypress" />

import { BookCard } from "./BookCard"

describe(`BookCardContent`, () => {

  describe(`Author suffix`, authorSuffixTests)
})

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
      language: `rus`,
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
      language: `rus`,
    })

    cy.contains(`Alexander Osterwalder`)
  })
}

function mountComponent({
  bookCoverUrl = `https://cdn.litres.ru/pub/c/cover/14363291.jpg`,
  title = `Test Title`,
  authors,
  language,
}: Partial<BookCardType> & { authors: BookCardType["authors"], language: BookCardType["language"], }) {
  cy.mount(
    <BookCard
      bookCoverUrl={bookCoverUrl}
      title={title}
      authors={authors}
      language={language}
    />,
  )
}
