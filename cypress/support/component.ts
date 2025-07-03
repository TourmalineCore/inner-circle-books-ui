import './commands'
import '../env-config'

/// <reference types="cypress" />

// styles
import 'react-datepicker/dist/react-datepicker.css'

import '../../src/styles/index.scss'

// commands
import { mount } from 'cypress/react18'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      compareSnapshot(name: string, options?: any): Chainable<Element>,
    }
  }
}

Cypress.Commands.add(`mount`, mount)

after(() => {
  //custom task to generate report
  cy.task(`generateReport`)
})