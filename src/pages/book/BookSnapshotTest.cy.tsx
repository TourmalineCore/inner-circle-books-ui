import { MemoryRouter } from "react-router-dom"
import { MOCK_TOKEN, VIEWPORTS } from "../../common/constant"
import { BookContent } from "./BookContent"
import { BookState } from "./state/BookState"
import { BookStateContext } from "./state/BookStateStateContext"
import { Language } from "../../common/enums/language"
import { authService } from "../../common/authService"
import { ProgressOfReading } from "../../common/enums/progressOfReading"

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
        .getByData(`book-page`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const bookState = new BookState()
  
  bookState.initializeBook({
    loadedBook: {
      id: 1,
      title: `ChatGPT мастер подсказок или как создавать сильные промты для нейросети`,
      annotation: `Уже сейчас нейросети выполняют тысячи контент-задач в разных сферах. От слоганов, статей и постов до учебных программ, выступлений и подбора креативных идей. Умение грамотно «общаться» с ИИ все чаще становится серьезным и порой даже главным карьерным или личным бонусом. Именно развитию навыков работы с ChatGPT и другими контентными ИИ (промт-инжиниринг) и посвящена эта книга. В ней даны правила и «фишки», показаны схемы и неочевидные моменты, которые должен знать сильный промтер. Также добавлены пошаговые мастер-классы создания промтов (подсказок) на основе некоторых маркетинговых и информационных типов контента.`,
      language: Language.RU,
      authors: [
        {
          fullName: `Петр Панда`,
        },
        {
          fullName: `Арина Сычева`,
        },
      ],
      coverUrl: ``,
      bookCopiesIds: [
        1,
        2,
      ],
      employeesWhoReadNow: [],
      knowledgeAreasIds: [],
    },
  })
  
  bookState.initializeFeedback({
    loadedFeedback: [
      {
        id: 1,
        employeeFullName: `Иванов Иван Иванович`,
        leftFeedbackAtUtc: `2024-12-09T00:00:00Z`,
        rating: 5,
        progressOfReading: ProgressOfReading.ReadEntirely,
        advantages: `Лучшая и самая понятная на сегодняшний день книга по промптингу.`,
        disadvantages: `Для дизайнеров эта книга не подходит. Все для копирайтинга, SMM, менеджмента.`,
      },
      {
        id: 2,
        employeeFullName: `Петров Петр Петрович`,
        leftFeedbackAtUtc: `2024-11-12T00:00:00Z`,
        rating: 4,
        progressOfReading: ProgressOfReading.ReadPartially,
        advantages: `-`,
        disadvantages: `-`,
      },
    ],
  })

  const mockAuthContext = [
    MOCK_TOKEN,
  ]

  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/books/1`,
        ]}>
        <authService.AuthContext.Provider value={mockAuthContext}>
          <BookStateContext.Provider value={bookState}>
            <BookContent 
              bookId="1"
              onTake={() => {}}
              openModalQrCode={() => {}}
            />
          </BookStateContext.Provider>
        </authService.AuthContext.Provider>,
      </MemoryRouter>,
    )
}
