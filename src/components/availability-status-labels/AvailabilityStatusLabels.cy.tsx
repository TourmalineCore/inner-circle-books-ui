import { AvailabilityStatus } from "../../common/enums/availabilityStatus"
import { AvailabilityStatusLabels } from "./AvailabilityStatusLabels"

describe(`AvailabilityStatusLabels`, () => {
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
