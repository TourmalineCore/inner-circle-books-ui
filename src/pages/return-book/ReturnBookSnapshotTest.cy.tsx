import { ReturnBookContent } from "./ReturnBookContent"
import { ReturnBookState } from "./state/ReturnBookState"
import { ReturnBookStateContext } from "./state/ReturnBookStateStateContext"

export const VIEWPORTS = [
  {
    width: 375,
    height: 1576,
  },
  {
    width: 768,
    height: 1408,
  },
  {
    width: 1920,
    height: 1008,
  },
]

describe(`Return Book Snapshot test`, () => {
  it(`Take the snapshot of a result`, () => {
    VIEWPORTS.forEach((viewport) => {
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

      cy
        .window()
        .then((win) => win.document.fonts.ready)

      cy
        .document()
        .its(`fonts.status`)
        .should(`equal`, `loaded`)

      cy
        .getByData(`return-book`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const returnBookState = new ReturnBookState()

  cy
    .mount(
      <ReturnBookStateContext.Provider value={returnBookState}>
        <ReturnBookContent
          coverUrl={`https://cdn.litres.ru/pub/c/cover_415/70413274.webp`}
          title={`ChatGPT мастер подсказок или как создавать сильные промты для нейросети`} 
          onSubmit={() => {}}/>
      </ReturnBookStateContext.Provider>,
    )
}
