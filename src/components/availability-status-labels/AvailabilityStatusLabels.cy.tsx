import { AvailabilityStatus } from "../../common/enums/availabilityStatus"
import { AvailabilityStatusLabels } from "./AvailabilityStatusLabels"

describe(`AvailabilityStatusLabels`, () => {
  it(`
  GIVEN all availability statuses
  WHEN render the component
  SHOULD see a label for each of them
  `, () => {
    mountComponent({
      availabilityStatuses: [
        AvailabilityStatus.OnYou,
        AvailabilityStatus.InOffice,
        AvailabilityStatus.OnHand,
      ],
    })

    cy
      .getByData(`availability-status-label`)
      .should(`have.length`, 3)

    cy.contains(`On You`)
    cy.contains(`In Office`)
    cy.contains(`On Hand`)
  })

  it(`
  GIVEN on you status after other statuses
  WHEN render the component
  SHOULD see on you label first
  `, () => {
    mountComponent({
      availabilityStatuses: [
        AvailabilityStatus.InOffice,
        AvailabilityStatus.OnYou,
      ],
    })

    cy
      .getByData(`availability-status-label`)
      .first()
      .should(`have.text`, `On You`)
  })
})

function mountComponent({
  availabilityStatuses,
}: {
  availabilityStatuses: AvailabilityStatus[],
}) {
  cy.mount(
    <AvailabilityStatusLabels availabilityStatuses={availabilityStatuses} />,
  )
}
