import { VIEWPORTS } from "../../common/constant"
import { BookContent } from "./BookContent"
import { BookState } from "./state/BookState"
import { BookStateContext } from "./state/BookStateStateContext"

describe(`Book Page Snapshot test`, () => {
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
        .getByData(`book`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const bookState = new BookState()
  
  bookState.initialize({
    loadedBook: {
      id: 1,
      title: `ChatGPT мастер подсказок или как создавать сильные промты для нейросети`,
      annotation: `Уже сейчас нейросети выполняют тысячи контент-задач в разных сферах. От слоганов, статей и постов до учебных программ, выступлений и подбора креативных идей. Умение грамотно «общаться» с ИИ все чаще становится серьезным и порой даже главным карьерным или личным бонусом. Именно развитию навыков работы с ChatGPT и другими контентными ИИ (промт-инжиниринг) и посвящена эта книга. В ней даны правила и «фишки», показаны схемы и неочевидные моменты, которые должен знать сильный промтер. Также добавлены пошаговые мастер-классы создания промтов (подсказок) на основе некоторых маркетинговых и информационных типов контента.`,
      count: 1,
      language: `ru`,
      authors: [
        {
          fullName: `Петр Панда`,
        },
        {
          fullName: `Арина Сычева`,
        },
      ],
      bookCoverUrl: ``,
    },
  })

  cy
    .wrap(bookState)
    .as(`toDosState`)

  cy
    .mount(
      <BookStateContext.Provider value={bookState}>
        <BookContent/>
      </BookStateContext.Provider>,
    )
}
