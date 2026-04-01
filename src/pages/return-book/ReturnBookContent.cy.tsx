import { ReturnBookContent } from './ReturnBookContent'
import { ReturnBookState } from './state/ReturnBookState'
import { ReturnBookStateContext } from './state/ReturnBookStateContext'

describe(`ReturnBookContent`, () => {
  it(`
  GIVEN a book return form
  WHEN "Not Read At All" is selected as progress
  SHOULD disable rating and feedback textarea
  `, () => {
    mountComponent()

    cy
      .contains(`button`, `Not Read At All`)
      .click()

    cy
      .getByData(`return-book-advantages`)
      .should(`be.disabled`)
      
    cy
      .getByData(`return-book-disadvantages`)
      .should(`be.disabled`)

    cy
      .get(`.rating`)
      .should(`have.class`, `disabled`)
  })

  function mountComponent() {
    const returnBookstate = new ReturnBookState()
  
    cy
      .mount(
        <ReturnBookStateContext.Provider value={returnBookstate}>
          <ReturnBookContent
            title="Test Book"
            coverUrl=""
            onSubmit={()=>{}}
            goToBookCopyPage={()=>{}}
          />
        </ReturnBookStateContext.Provider>,
      )
  }
})