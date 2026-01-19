import { AddBookContent } from "../../AddBookContent"
import { AddBookState } from "../../state/AddBookState"
import { AddBookStateContext } from "../../state/AddBookStateStateContext"
import { MAX_VALUE, MIN_VALUE } from "./CounterInput"

const minValue = MIN_VALUE.toString()
const minValueIncrement = (MIN_VALUE + 1).toString()
const maxValue = MAX_VALUE.toString()

describe(`CounterInput`, () => {
  it(`
  GIVEN default counter input
  WHEN it has default state
  SHOULD have value = 1
  AND SHOULD not allow value to go below minimum
  `, () => {
    mountComponent()

    cy
      .getByData(`counter-input-value`)
      .should(`have.value`, minValue) 

    cy
      .getByData(`counter-input-button-minus`)
      .should(`be.disabled`)
  })

  it(`
  GIVEN default counter input
  WHEN it has maximum value
  SHOULD not allow value to exceed maximum
  `, () => {
    mountComponent()

    cy
      .getByData(`counter-input-value`)
      .clear()
      .type(maxValue)

    cy
      .getByData(`counter-input-button-plus`)
      .should(`be.disabled`)
  })

  it(`
  GIVEN default counter input
  WHEN plus button is clicked
  SHOULD increment the value
  `, () => {
    mountComponent()

    cy
      .getByData(`counter-input-value`)
      .should(`have.value`, minValue)

    cy
      .getByData(`counter-input-button-plus`)
      .click()
      
    cy
      .getByData(`counter-input-value`)
      .should(`have.value`, minValueIncrement)
  })

  it(`
  GIVEN default counter input
  WHEN minus button is clicked
  SHOULD decrement the value
  `, () => {
    mountComponent()
      
    cy
      .getByData(`counter-input-button-plus`)
      .click()

    cy
      .getByData(`counter-input-value`)
      .should(`have.value`, minValueIncrement)

    cy
      .getByData(`counter-input-button-minus`)
      .click()

    cy
      .getByData(`counter-input-value`)
      .should(`have.value`, minValue)
  })

  it(`
  GIVEN default counter input
  WHEN process input data
  SHOULD behave correctly
  `, () => {
    mountComponent()

    cy
      .getByData(`counter-input-value`)
      .clear()
      .type(`15`)
      .blur()

    cy
      .getByData(`counter-input-value`)
      .should(`have.value`, `15`) 
    
    // check that letters are not allowed
    cy
      .getByData(`counter-input-value`)
      .clear()
      .type(`abc`)
      .blur()

    cy
      .getByData(`counter-input-value`)
      .should(`have.value`, minValue) 

    // check limit to two digits
    cy
      .getByData(`counter-input-value`)
      .clear()
      .type(`123`)
      .blur()

    cy
      .getByData(`counter-input-value`)
      .should(`have.value`, `12`) 
  })
})

function mountComponent() {
  const addBookState = new AddBookState()

  // Test doesn't work using CounterInput because of nested state, 
  // so we'll test it using AddBookContent
  cy
    .mount(
      <AddBookStateContext.Provider value={addBookState}>
        <AddBookContent 
          onSubmit={()=>{}}
          goToBooksList={()=>{}} 
        />
      </AddBookStateContext.Provider >,
    )
}
