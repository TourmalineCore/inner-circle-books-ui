import { authService } from "../../common/authService"
import { AllBooksState } from "./state/AllBooksState"
import { AllBooksStateContext } from "./state/AllBooksStateStateContext"
import { MOCK_TOKEN } from "../../common/constant"
import { AllBooksContent } from "./AllBooksContent"

describe(`AllBooksContent`, () => {
  describe(`Loader`, loaderTests)
})

function loaderTests() {
  it(`
  GIVEN state with isLoading equal false
  WHEN render the component
  THEN loader is not exist
  `, () => {
    mountComponent()

    cy.getByData(`books-loader`)
      .should(`not.exist`)
  })

  it(`
  GIVEN state with isLoading equal true
  WHEN render the component
  THEN loader is exist
  `, () => {
    mountComponent({
      isLoading: true,
    })

    cy.getByData(`books-loader`)
      .should(`exist`)
  })
}

function mountComponent({
  isLoading = false,
}: {
  isLoading?: boolean,
} = {}) {
  const allBooksState = new AllBooksState()

  allBooksState.setIsLoading({
    isLoading,
  })

  const mockAuthContext = [
    MOCK_TOKEN,
  ]
  
  cy
    .mount(
      <authService.AuthContext.Provider value={mockAuthContext}>
        <AllBooksStateContext.Provider value={allBooksState}>
          <AllBooksContent />
        </AllBooksStateContext.Provider>
      </authService.AuthContext.Provider>,
    )
}
