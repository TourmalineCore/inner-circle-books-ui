// import { VIEWPORTS } from "../../../../common/constant"

// describe(`Modal QR Form Snapshot test`, () => {
//   it(`Take the snapshot of a result`, () => {
//     VIEWPORTS.forEach((viewport) => {
//       cy.viewport(viewport.width, viewport.height)

//       cy.wrap(
//         Cypress.automation(`remote:debugger:protocol`, {
//           command: `Emulation.setDeviceMetricsOverride`,
//           params: {
//             width: viewport.width,
//             height: viewport.height,
//             deviceScaleFactor: 1,
//             mobile: false,
//           },
//         }),
//       )

//       mountComponent()

//       cy
//         .window()
//         .then((win) => win.document.fonts.ready)

//       cy
//         .getByData(`modal-qr-form`)
//         .compareSnapshot(`/${viewport.width}`, {
//           capture: `viewport`,
//         })
//     })
//   })
// })

// function mountComponent() {

//   const BOOK = {
//     title: `ChatGPT мастер подсказок или как создавать сильные промты  для нейросети`,

//   }

//   cy
//     .mount(
//       <BookContent />,
//     )
// }
