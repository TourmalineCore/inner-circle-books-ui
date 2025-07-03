import { MemoryRouter } from "react-router-dom"
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
    cy
      .intercept(
        `POST`, 
        `**/books`, 
        req => {
          req.alias = `createBook`
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
      .getByData(`add-book-form-title`)
      .type(`Новая книга`)

    cy
      .getByData(`add-book-form-annotation`)
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
  })
}

function mountComponent() {
  const addBookState = new AddBookState()

  cy
    .mount(
      <MemoryRouter>
        <AddBookStateContext.Provider value={addBookState}>
          <AddBookContainer />
        </AddBookStateContext.Provider>
      </MemoryRouter>,
    )
}
