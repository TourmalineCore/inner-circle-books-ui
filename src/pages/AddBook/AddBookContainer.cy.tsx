import { AddBookContainer } from "./AddBookContainer"
import { AddBookState } from "./state/AddBookState"
import { AddBookStateContext } from "./state/AddBookStateStateContext"

describe(`AddBookContainer.cy`, () => {
  beforeEach(() => {
    cy.intercept(`POST`, `**/books`, req => {
      req.alias = `createBook`
    })
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

    cy.getByData(`add-book-form-title`)
      .type(`Новая книга`)

    cy.getByData(`add-book-form-annotation`)
      .type(`Описание книги`)

    cy.get(`.dynamic-input-list`)
      .type(`Имя Автора`)

    cy.get(`.image-preview-input__input`)
      .type(`https://my.cdn/book.jpg`)

    cy.contains(`English`)
      .click()

    // Нажимаем кнопку добавления
    cy.getByData(`add-book-form-add`)
      .click()

    // Проверяем, что ушел корректный запрос
    cy.wait(`@createBook`)
      .its(`request.body`)
      .should(`deep.equal`, {
        title: `Новая книга`,
        annotation: `Описание книги`,
        authors: [
          {
            fullName: `Имя Автора`, 
          },
        ],
        language: `en`,
        bookCoverUrl: `https://my.cdn/book.jpg`,
      })
  })
}

function mountComponent() {
  const addBookState = new AddBookState()

  cy.mount(
    <AddBookStateContext.Provider value={addBookState}>
      <AddBookContainer />
    </AddBookStateContext.Provider>,
  )
}
