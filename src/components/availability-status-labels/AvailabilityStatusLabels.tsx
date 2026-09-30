import './AvailabilityStatusLabels.scss'

import clsx from 'clsx'
import { AVAILABILITY_STATUS_LABELS, AvailabilityStatus } from '../../common/enums/availabilityStatus'

export function AvailabilityStatusLabels({
  availabilityStatuses,
  className,
}: {
  availabilityStatuses: AvailabilityStatus[],
  className?: string,
}) {
  const sortedStatuses = [
    ...availabilityStatuses.filter((status) => status === AvailabilityStatus.OnYou),
    ...availabilityStatuses.filter((status) => status !== AvailabilityStatus.OnYou),
  ]

  return (
    <ul className={clsx(`availability-status-labels`, className)}>
      {sortedStatuses.map((status) => (
        <li
          key={status}
          className={`availability-status-labels__label availability-status-labels__label--${status.toLowerCase()}`}
          data-cy="availability-status-label"
        >
          {AVAILABILITY_STATUS_LABELS[status]}
        </li>
      ))}
    </ul>
  )
}
