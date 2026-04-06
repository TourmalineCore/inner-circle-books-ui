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
      .should(`have.class`, `rating--disabled`)
  })

  it(`
  GIVEN a user selected "Read Partially" and set a rating
  WHEN switching to "Not Read At All" and back to "Read Partially"
  SHOULD disable rating, then restore previously selected rating
  `, () => {
    mountComponent()

    cy
      .contains(`button`, `Read Partially`)
      .click()

    cy
      .get(`.rating > :nth-child(3)`)
      .click()

    cy
      .get(`.rating__star--active`)
      .should(`have.length`, 3)
    
    cy
      .get(`.rating__star--disabled`)
      .should(`not.exist`)

    cy
      .contains(`button`, `Not Read At All`)
      .click()

    cy
      .get(`.rating__star--disabled`)
      .should(`exist`)

    cy
      .contains(`button`, `Read Partially`)
      .click()

    cy
      .get(`.rating__star--active`)
      .should(`have.length`, 3)
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