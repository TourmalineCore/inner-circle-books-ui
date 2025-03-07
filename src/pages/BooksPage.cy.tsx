import { BooksPage } from "./BooksPage"

describe(`BooksPage`, () => {
  it(`
  GIVEN books page 
  WHEN visit books page 
  THEN render init text
  `, () => {
    mountComponent()

    cy
      .getByData(`books-page`)
      .should(`have.text`, `This is init books page`)
  })
})

function mountComponent() {
  cy.mount(
    <BooksPage />,
  )
}
