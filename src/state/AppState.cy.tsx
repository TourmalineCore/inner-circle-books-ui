import { AppState } from './AppState'

describe(`AppState`, () => {
  describe(`Initialization`, initializationTest)
  describe(`Setters`, settersTests)
})

function initializationTest() {
  const appState = new AppState()

  it(`
  GIVEN a new appState
  WHEN initialize
  SHOULD have default knowledge values
  `, () => {
    expect(appState.knowledgeAreas).to.deep.equal([])
  })
}

function settersTests() {
  let appState: AppState
  
  beforeEach(() => {
    appState = new AppState()
  })

  it(`
	GIVEN initial state with empty knowledgeAreas
	WHEN setKnowledgeAreas
	SHOULD set knowledgeAreas
	`, () => {
    const knowledgeAreasForInitialization = [
      {
        id: 1,
        name: `Backend`,
      },
      {
        id: 2,
        name: `Frontend`,
      },
    ]

    appState.setKnowledgeAreas({
      knowledgeAreas: knowledgeAreasForInitialization,
    })

    expect(appState.knowledgeAreas)
      .to
      .deep
      .eq(knowledgeAreasForInitialization)
  })
}
