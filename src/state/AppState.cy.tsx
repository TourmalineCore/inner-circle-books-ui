import { AppState } from './AppState'

const KNOWLEDGE_AREAS = [
  {
    id: 1,
    name: `Frontend`,
  },
  {
    id: 2,
    name: `Backend`,  
  },
]

describe(`AppState`, () => {
  describe(`Initialization`, initializationTest)
  describe(`Fetch`, fetchTests)
})

function initializationTest() {
  const appState = new AppState()

  it(`
  GIVEN a new appState
  WHEN initialize
  SHOULD have default knowledge areas values
  `, () => {
    expect(appState.knowledgeAreas)
      .to
      .deep
      .equal([])
  })
}

function fetchTests() {
  let appState: AppState
  
  beforeEach(() => {
    appState = new AppState()

    cy.intercept(
      `GET`,
      `**/knowledge-areas`,
      (req) => {
        req.alias = `getKnowledgeAreas`
        req.reply({
          statusCode: 200,
          body: {
            knowledgeAreas: KNOWLEDGE_AREAS,
          }, 
        })
      },
    )
  })

  it(`
	GIVEN initial state with empty knowledgeAreas
	WHEN fetchAndSetKnowledgeAreas
	SHOULD set knowledgeAreas from API
	`, () => {
    appState.fetchAndSetKnowledgeAreas()

    cy.wait(`@getKnowledgeAreas`)
      .then(() => expect(appState.knowledgeAreas)
        .to
        .deep
        .equal(KNOWLEDGE_AREAS),
      )
  })
}
