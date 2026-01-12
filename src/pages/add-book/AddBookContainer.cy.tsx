import { Language } from "../../common/enums/language"
import { AppState } from "../../state/AppState"
import { AppStateContext } from "../../state/AppStateContext"
import { AddBookContainer } from "./AddBookContainer"
import { AddBookState } from "./state/AddBookState"
import { AddBookStateContext } from "./state/AddBookStateStateContext"

const BOOK = {
  knowledgeAreasIds: [
    1,
  ],
  title: `Разработка ценностных предложений`,
  annotation: `Аннотация`,
  language: Language.EN,
  authors: [
    {
      fullName: `Алекс Остервальдер`, 
    },
  ],
  coverUrl: `https://book.jpg`,
  countOfCopies: 2,
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
      .getByData(`knowledge-areas-multiple-select`)
      .click()

    cy
      .contains(`Frontend`)
      .click()
    cy
      .getByData(`add-book-title`)
      .type(`Разработка ценностных предложений`)

    cy
      .getByData(`add-book-annotation`)
      .type(`Аннотация`)

    cy
      .getByData(`counter-input-value`)
      .clear()
      .type(`2`)

    cy
      .get(`.dynamic-input-list`)
      .type(`Алекс Остервальдер`)

    cy
      .get(`.image-preview-input__input`)
      .type(`https://book.jpg`)

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
  const appState = new AppState()

  appState.setKnowledgeAreas({
    knowledgeAreas: [
      {
        id: 1,
        name: `Frontend`,
      },
    ],
  })

  cy
    .mount(
      <AppStateContext.Provider value={appState}>
        <AddBookStateContext.Provider value={addBookState}>
          <AddBookContainer goToBooksList={onSuccess} />
        </AddBookStateContext.Provider>
      </AppStateContext.Provider>,
    )
}