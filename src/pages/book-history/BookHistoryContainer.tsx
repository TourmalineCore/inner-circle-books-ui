import { observer } from "mobx-react-lite"
import { useLocation } from "react-router-dom"
import { ServerTable } from '@tourmalinecore/react-table-responsive'
import '@tourmalinecore/react-table-responsive/styles.css'
import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import { getStatus } from "./getStatus/getStatus"
import { API_ROOT } from "../../common/config/config"

export const BookHistoryContainer = observer(() => {
  const location = useLocation()
  const pathnameParts = location
    .pathname
    .split(`/`)
  const id = pathnameParts[3]

  return (
    <ServerTable<BookCopyHistory>
      tableId={`book-history`}
      tcApiHostUrl={API_ROOT}
      tcDataPath={`/history/${id}`}
      columns={[
        {
          id: `Copy Number`,
          accessorFn: ({
            copyNumber,
          }) => copyNumber,
          size: 80,
        },
        {
          id: `Employee`,
          accessorFn: ({
            employeeFullName,
          }) => employeeFullName,
        },
        {
          id: `Date of taking`,
          accessorFn: ({
            takenDate,
          }) => takenDate,
          size: 80,
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
          }) => actualReturnedDate,
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
          size: 80,
        },
        {
          id: `Reading Progress`,
          accessorFn: ({
            progressOfReading,
          }) => progressOfReading || `-`,
          size: 100,
        },
      ]}
      tcOrder={{
        id: ``,
        desc: false,
      }}
      tcRenderMobileTitle={(row) => row.original.employeeFullName}
    />
  )
})
