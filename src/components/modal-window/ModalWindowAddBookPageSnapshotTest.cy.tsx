import { BookState } from "../../pages/book/state/BookState"
import { BookStateContext } from "../../pages/book/state/BookStateStateContext"
import { ModalWindow } from "./ModalWindow"

export const VIEWPORTS = [
  {
    width: 375,
    height: 343,
  },
  {
    width: 768,
    height: 480,
  },
]

describe(`Modal Window Add Book Page Snapshot test`, () => {
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
        .getByData(`modal-window`)
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
        <ModalWindow
          onQuit={() => {}}
          onCloseModal={() => {}}
          title="Do You Want to Quit this&nbsp;Page?"
          text="The data you have entered will not&nbsp;be saved"
          buttonLabel="No, Stay Here"
          accentButtonLabel="Yes, Quit"
        />,
      </BookStateContext.Provider>,
    )
}