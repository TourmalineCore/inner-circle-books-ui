import { BookContainer } from "./BookContainer"
import { BookState } from "./state/BookState"
import { BookStateContext } from "./state/BookStateStateContext"

const BOOK_RESPONSE = {
  id: 1,
  title: `ChatGPT мастер подсказок или как создавать сильные промты для нейросети`,
  annotation: `Уже сейчас нейросети выполняют тысячи контент-задач в разных сферах. От слоганов, статей и постов до учебных программ, выступлений и подбора креативных идей. Умение грамотно «общаться» с ИИ все чаще становится серьезным и порой даже главным карьерным или личным бонусом. Именно развитию навыков работы с ChatGPT и другими контентными ИИ (промт-инжиниринг) и посвящена эта книга. В ней даны правила и «фишки», показаны схемы и неочевидные моменты, которые должен знать сильный промтер. Также добавлены пошаговые мастер-классы создания промтов (подсказок) на основе некоторых маркетинговых и информационных типов контента.`,
  bookCoverUrl: `https://cdn.litres.ru/pub/c/cover_415/70413274.webp`,
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

describe(`BookContainer`, () => {
  beforeEach(() => {
    cy.intercept(
      `GET`,
      `*/books/1`,
      BOOK_RESPONSE,
    )
  })

  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  it(`
  GIVEN book data from network
  WHEN render the component
  SHOULD see it
  `, () => {
    mountComponent()

    cy.contains(`Разработка ценностных предложений`)
    cy.contains(`annotation`)
    cy.contains(`Russian`)
    cy.contains(`Алекс Остервальдер`)
    cy.contains(`Сергей Николенко`)
    
    cy
      .get(`img[src="https://cdn.litres.ru/pub/c/cover_415/70413274.webp"]`)
      .should(`exist`)
  })
}

function mountComponent() {
  const bookState = new BookState()

  cy
    .mount(
      <BookStateContext.Provider value={bookState}>
        <BookContainer />
      </BookStateContext.Provider>,
    )
}
