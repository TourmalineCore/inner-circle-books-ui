/// <reference types="cypress" />

import { BookCardsContent } from "./BookCardsContent"

describe(`Page Snapshot test with Cypress`, () => {

  const viewports = [
    {
      width: 375,
      height: 1420,
    },
    {
      width: 768,
      height: 1036,
    },
    {
      width: 1024,
      height: 1220,
    },
    {
      width: 1366,
      height: 1076,
    },
    {
      width: 1920,
      height: 1076,
    },
  ]

  it(`Take the snapshot of a result`, () => {

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)

      cy.wrap(
        Cypress.automation(`remote:debugger:protocol`, {
          command: `Emulation.setDeviceMetricsOverride`,
          params: {
            width: viewport.width,
            height: viewport.height,
            deviceScaleFactor: 1,
            mobile: false,
          },
        }),
      )

      mountComponent()

      cy.get(`[data-cy="cards"]`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const card =
  {
    bookCoverUrl: `https://cdn.litres.ru/pub/c/cover/14363291.jpg`,
    title: `Разработка ценностных предложений. Как создавать товары и услуги, которые захотят купить потребители. Ваш первый шаг`,
    authors: [
      {
        fullName: `Алекс Остервальдер`,
      },
      {
        fullName: `Сергей Николенко`,
      },
    ],
    language: `rus`,
  }

  const cards = Array.from({
    length: 12,
  }, () => card)

  cy.mount(<BookCardsContent cards={cards} />)
}