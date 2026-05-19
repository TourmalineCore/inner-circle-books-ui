import { authService } from "../../common/authService"
import { AllBooksContainer } from "./AllBooksContainer"
import { AllBooksState } from "./state/AllBooksState"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import { MOCK_TOKEN } from "../../common/constant"
import { Language } from "../../common/enums/language"

const BOOK_CARDS_RESPONSE = {
  books: [
    {
      title: `Разработка ценностных предложений`,
      language: Language.RU,
      authors: [
        {
          fullName: `Алекс Остервальдер`,
        },
        {
          fullName: `Сергей Николенко`,
        },
      ],
      coverUrl: ``,
    },
    {
      title: `Думай медленно… решай быстро`,
      language: Language.EN,
      authors: [
        {
          fullName: `Даниэль Канеман`,
        },
      ],
      coverUrl: ``,
    },
  ],
}

const KNOWLEDGE_AREAS_RESPONSE = {
  knowledgeAreas: [
    {
      id: 1,
      name: `Backend`,
    },
    {
      id: 2,
      name: `Frontend`,
    },
  ],
}

describe(`AllBooksContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `*/books`,
      BOOK_CARDS_RESPONSE,
    )
    cy.intercept(
      `GET`,
      `*/books/knowledge-areas`,
      KNOWLEDGE_AREAS_RESPONSE,
    )
  })

  describe(`Books Initialization`, booksInitializationTests)
  describe(`Knowledge Areas Initialization`, knowledgeAreasInitializationTests)
})

function booksInitializationTests() {
  it(`
  GIVEN two book cards from network
  WHEN render the component
  SHOULD see them
  `, () => {
    mountComponent()

    cy.contains(`Думай медленно… решай быстро`)
    cy.contains(`Разработка ценностных предложений`)
    cy.contains(Language.EN)
    cy.contains(`Даниэль Канеман`)
  })
}

function knowledgeAreasInitializationTests() {
  it(`
  GIVEN two knowledge areas from network
  WHEN render the component
  SHOULD display knowledge areas
  `, () => {
    cy.viewport(1366, 750)
    
    mountComponent()

    cy.contains(`Backend`)
    cy.contains(`Frontend`)
  })
}

function mountComponent() {
  const allBooksState = new AllBooksState()

  const mockAuthContext = [
    MOCK_TOKEN,
  ]
  
  cy
    .mount(
      <authService.AuthContext.Provider value={mockAuthContext}>
        <AllBooksStateContext.Provider value={allBooksState}>
          <AllBooksContainer />
        </AllBooksStateContext.Provider>
      </authService.AuthContext.Provider>,
    )
}
