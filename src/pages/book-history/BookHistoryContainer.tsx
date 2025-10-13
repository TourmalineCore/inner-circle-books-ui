import './BookHistoryContainer.scss'

import { useLocation } from "react-router-dom"
import { ServerTable } from '@tourmalinecore/react-table-responsive'
import '@tourmalinecore/react-table-responsive/styles.css'
import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import { getStatus } from "./getStatus/getStatus"
import { API_ROOT } from "../../common/config/config"
import { api } from "../../common/api"
import { ProgressOfReading } from "../../common/enums/progressOfReading"

const PROGRESS_OPTIONS = {
  [ProgressOfReading.NotReadAtAll]: `Not Read At All`,
  [ProgressOfReading.ReadPartially]: `Read Partially`,
  [ProgressOfReading.ReadEntirely]: `Read Entirely`,
}

export function BookHistoryContainer() {
  const location = useLocation()
  const pathnameParts = location
    .pathname
    .split(`/`)
  const id = pathnameParts[3]

  return (
    <ServerTable<BookCopyHistory>
      tableId={`book-history-${id}`}
      tcHttpClient={api}
      tcApiHostUrl={API_ROOT}
      tcDataPath={`/books/history/${id}`}
      columns={[
        {
          id: `Copy`,
          accessorFn: ({
            copyNumber,
          }) => copyNumber,
          tcNonMobileColumn: true,
          size: 80,
        },
        {
          id: `Employee`,
          accessorFn: ({
            employeeFullName,
          }) => employeeFullName,
          tcNonMobileColumn: true,
        },
        {
          id: `Date of taking`,
          accessorFn: ({
            takenDate,
          }) => takenDate,
        },
        {
          id: `Scheduled Return Date`,
          accessorFn: ({
            scheduledReturnDate,
          }) => scheduledReturnDate,
        },
        {
          id: `Actual Return Date`,
          accessorFn: ({
            actualReturnedDate,
          }) => actualReturnedDate || `-`,
        },
        {
          id: `Status`,
          accessorFn: ({
            scheduledReturnDate,
            actualReturnedDate,
          }) => getStatus({
            scheduledReturnDate,
            actualReturnedDate,
          }),
        },
        {
          id: `Reading Progress`,
          accessorFn: ({
            progressOfReading,
          }) => progressOfReading
            ? PROGRESS_OPTIONS[progressOfReading as ProgressOfReading]
            : `-`,
        },
      ]}
      tcOrder={{
        id: ``,
        desc: false,
      }}
      tcRenderMobileTitle={(row) => `Copy ${row.original.copyNumber}, ${row.original.employeeFullName}`}
    />
  )
}
