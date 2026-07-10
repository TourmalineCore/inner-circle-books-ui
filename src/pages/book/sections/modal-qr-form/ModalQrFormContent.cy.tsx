import { ModalQRFormContent } from "./ModalQRFormContent"
import { ModalQrFormState } from "./state/ModalQrFormState"
import { ModalQrFormStateContext } from "./state/ModalQrFormStateContext"

describe(`ModalQrFormContent`, () => {
  describe(`Add copy button`, addCopyButtonTests)
})

function addCopyButtonTests() {
  it(`
  GIVEN add copy button
  WHEN isSaving = false
  THEN button is not disabled
  AND have text "Add copy" 
  `, () => {
    mountComponent()

    cy.getByData(`add-copy-button`)
      .should(`not.be.disabled`)

    cy.getByData(`add-copy-button`)
      .should(`contain.text`, `Add Copy`)
  })

  it(`
  GIVEN add copy button
  WHEN isSaving = true
  THEN button is disabled
  AND have text "Adding copy" 
  `, () => {
    mountComponent({
      isSaving: true,
    })

    cy.getByData(`add-copy-button`)
      .should(`be.disabled`)

    cy.getByData(`add-copy-button`)
      .should(`contain.text`, `Adding Copy`)
  })
}

function mountComponent({
  isSaving = false,
}: {
  isSaving?: boolean,
} = {}) {
  const modalQrFormState = new ModalQrFormState()

  if (isSaving) {
    modalQrFormState.setIsSaving()
  }

  cy.viewport(1366, 750)
  
  cy
    .mount(
      <ModalQrFormStateContext.Provider value={modalQrFormState}>
        <ModalQRFormContent
          loadModalQrFormDataAsync={() => {}}
          addBookCopyAsync={() => {}}
          onCloseModal={() => {}}
        />
      </ModalQrFormStateContext.Provider>,

    )
}