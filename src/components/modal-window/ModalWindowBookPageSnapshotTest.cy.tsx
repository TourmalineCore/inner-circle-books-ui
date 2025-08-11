import { BookState } from "../../pages/book/state/BookState"
import { BookStateContext } from "../../pages/book/state/BookStateStateContext"
import { ModalWindow } from "./ModalWindow"
import './../../pages/book/BookContent.scss'

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

describe(`Modal Window Book Page Snapshot test`, () => {
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
          title="When you are Going to&nbsp;Return Book to&nbsp;the Library?"
          text={
            <>
              You can choose the date in the next step or the date{` `}
              <span className='text-accent'>
                13.04.2025
              </span>
              {` `}will be selected automatically
            </>
          }
          buttonLabel="Choose the Return Date"
          accentButtonLabel="Take Book"
          hasCloseButton
        />,
      </BookStateContext.Provider>,
    )
}