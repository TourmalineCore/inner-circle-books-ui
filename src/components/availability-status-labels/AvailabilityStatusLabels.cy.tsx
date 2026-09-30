import { AvailabilityStatus } from "../../common/enums/availabilityStatus"
import { AvailabilityStatusLabels } from "./AvailabilityStatusLabels"

describe(`AvailabilityStatusLabels`, () => {
  it(`
  GIVEN "On you" and "In office" statutes
  WHEN render the component
  SHOULD see that the label "On you" is the first one
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
