import { BookState } from "../../state/BookState"
import { BookStateContext } from "../../state/BookStateStateContext"
import { ModalQRForm } from "./ModalQRForm"

export const VIEWPORTS = [
  {
    width: 375,
    height: 555,
  },
  {
    width: 1024,
    height: 612,
  },
  {
    width: 1920,
    height: 664,
  },
]

export const VIEWPORTS_FOR_ONE = [
  {
    width: 375,
    height: 320,
  },
  {
    width: 1920,
    height: 324,
  },
]

describe(`Modal QR Form Snapshot test`, () => {
  beforeEach(() => {
    const style = document.createElement(`style`)
    style.innerHTML = `
      .modal-qr-form {
        margin-bottom: 0 !important;
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

      mountComponentForSeveralCopies()

      cy
        .window()
        .then((win) => win.document.fonts.ready)

      cy
        .getByData(`modal-qr-form`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })

  it(`Take the snapshot of a result with one copy`, () => {
    VIEWPORTS_FOR_ONE.forEach((viewport) => {
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

      mountComponentForOneCopy()

      cy
        .window()
        .then((win) => win.document.fonts.ready)

      cy
        .getByData(`modal-qr-form`)
        .compareSnapshot(`/one${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponentForSeveralCopies() {
  const bookState = new BookState()
    
  bookState.initialize({
    loadedBook: {
      id: 1,
      title: `ChatGPT мастер подсказок или как создавать сильные промты  для нейросети`,
      annotation: ``,
      language: `ru`,
      authors: [
        {
          fullName: ``,
        },
      ],
      bookCoverUrl: ``,
      bookCopies: [
        {
          bookCopyId: 11,
        },
        {
          bookCopyId: 12,
        },
        {
          bookCopyId: 13,
        },
        {
          bookCopyId: 14,
        },
        {
          bookCopyId: 15,
        },
      ],
    },
  })
    
  cy
    .mount(
      <BookStateContext.Provider value={bookState}>
        <ModalQRForm
          onPrint={() => {}}
          onCloseModal={() => {}}
        />,
      </BookStateContext.Provider>,
    )
}

function mountComponentForOneCopy() {
  const bookState = new BookState()
    
  bookState.initialize({
    loadedBook: {
      id: 1,
      title: `ChatGPT мастер подсказок или как создавать сильные промты  для нейросети`,
      annotation: ``,
      language: `ru`,
      authors: [
        {
          fullName: ``,
        },
      ],
      bookCoverUrl: ``,
      bookCopies: [
        {
          bookCopyId: 11,
        },
      ],
    },
  })
    
  cy
    .mount(
      <BookStateContext.Provider value={bookState}>
        <ModalQRForm
          onPrint={() => {}}
          onCloseModal={() => {}}
        />,
      </BookStateContext.Provider>,
    )
}
