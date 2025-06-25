/// <reference types="cypress" />

import { BookCard } from "./BookCard"

describe(`Page Snapshot test with Cypress`, () => {
  const viewports = [
    {
      width: 343,
      height: 328,
    },
    {
      width: 768,
      height: 516,
    },
    {
      width: 1024,
      height: 576,
    },
    {
      width: 1366,
      height: 504,
    },
    {
      width: 1922,
      height: 504,
    },
  ]

  it(`Take the snapshot of a result`, () => {

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)

      mountComponent()

      cy.get(`[data-cy="card"]`)
        .compareSnapshot(`/${viewport.width}`)
    })
  })
})

function mountComponent() {
  cy.mount(
    <BookCard
      bookCoverUrl="https://cdn.litres.ru/pub/c/cover/14363291.jpg"
      title="Разработка ценностных предложений. Как создавать товары и услуги, которые захотят купить потребители. Ваш первый шаг"
      authors={[
        {
          fullName: `Алекс Остервальдер`,
        },
        {
          fullName: `Сергей Николенко`,
        },
      ]}
      language="rus"
    />,
  )
}