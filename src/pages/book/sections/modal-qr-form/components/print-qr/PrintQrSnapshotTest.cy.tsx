
import moment from "moment"
import { PrintQr } from "./PrintQr"

describe(`Print QR Snapshot test`, () => {

  it(`Take the snapshot of a result`, () => {
    mountComponent()

    cy
      .window()
      .then((win) => win.document.fonts.ready)

    cy
      .getByData(`print-qr`)
      .compareSnapshot(`/${375}`, {
        capture: `viewport`,
      })
  })
})

function mountComponent() {
  cy.viewport(375, 500)

  cy
    .mount(
      <PrintQr
        bookCopyId={1}
        title="Designing Data-Intensive Applications"
        secretKey="ab2d"
        timestamp={moment(`2025-10-17 13:00`)}
      />,
    ) 
}