import { AppContainer } from "./AppContainer"

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

describe(`AppContainer`, () => {  
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `**/knowledge-areas`,
      (req) => {
        req.alias = `getKnowledgeAreas`
        req.reply({
          statusCode: 200,
          body: KNOWLEDGE_AREAS,
        })
      },
    )
  })

  describe(`Get knowledge areas`, getKnowledgeAreas)
})

function getKnowledgeAreas() {
  it.skip(`
  GIVEN app
  WHEN open app
  SHOULD get correct knowledge areas
  `, () => {
    mountComponent()

    cy
      .wait(`@getKnowledgeAreas`)
      .its(`request.body`)
      .should(`deep.equal`, KNOWLEDGE_AREAS)
  })
}

function mountComponent(
) {
  cy
    .mount(
      <AppContainer />,
    )
}