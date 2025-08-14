import { BookState } from "../../state/BookState"
import { BookStateContext } from "../../state/BookStateStateContext"
import { ModalCalendar } from "./ModalCalendar"

export const VIEWPORTS = [
  {
    width: 375,
    height: 660,
  },
  {
    width: 1024,
    height: 632,
  },
]

describe(`Modal Calendar Snapshot test`, () => {
  beforeEach(() => {
    const style = document.createElement(`style`)
    style.innerHTML = `
      .modal-calendar {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
      }
    `
    document.head.appendChild(style)
  })

  it(`Take the snapshot of a result with several copies`, () => {
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
        .getByData(`modal-calendar`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const bookState = new BookState()
    
  cy
    .mount(
      <BookStateContext.Provider value={bookState}>
        <ModalCalendar
          onAccentButtonAction={() => {}}
          onButtonAction={() => {}}
          onCloseModal={() => {}}
        />,
      </BookStateContext.Provider>,
    )
}