import { AddBookContainer } from "./AddBookContainer"
import { AddBookState } from "./state/AddBookState"
import { AddBookStateContext } from "./state/AddBookStateStateContext"

const BOOK = {
  title: `Новая книга`,
  annotation: `Описание книги`,
  authors: [
    {
      fullName: `Имя Автора`, 
    },
  ],
  language: `en`,
  bookCoverUrl: `https://my.cdn/book.jpg`,
}
      
describe(`AddBookContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `POST`,
      `**/books`,
      (req) => {
        req.alias = `createBook`
        req.reply({
          statusCode: 200,
        })
      },
    )
  })

  describe(`Add Book Flow`, addBookFlowTests)
})

function addBookFlowTests() {
  it(`
  GIVEN filled form
  WHEN user clicks "Add"
  SHOULD send correct payload to API
  `, () => {
    mountComponent()

    cy
      .getByData(`add-book-title`)
      .type(`Новая книга`)

    cy
      .getByData(`add-book-annotation`)
      .type(`Описание книги`)

    cy
      .get(`.dynamic-input-list`)
      .type(`Имя Автора`)

    cy
      .get(`.image-preview-input__input`)
      .type(`https://my.cdn/book.jpg`)

    cy
      .contains(`English`)
      .click()

    cy
      .get(`.button__accent`)
      .click()

    cy
      .wait(`@createBook`)
      .its(`request.body`)
      .should(`deep.equal`, BOOK)

    cy.get(`@onSuccess`)
      .should(`have.been.called`)

  })
}

function mountComponent(
  onSuccess = cy
    .stub()
    .as(`onSuccess`),
) {
  const addBookState = new AddBookState()

  cy.mount(
    <AddBookStateContext.Provider value={addBookState}>
      <AddBookContainer goToBooksList={onSuccess} />
    </AddBookStateContext.Provider>,
  )
}