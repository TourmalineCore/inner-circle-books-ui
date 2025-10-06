import { observer } from "mobx-react-lite"
import { ClientTable } from '@tourmalinecore/react-table-responsive'
import '@tourmalinecore/react-table-responsive/styles.css'
import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import { useContext } from "react"
import { BookHistoryStateContext } from "./state/BookHistoryStateContext"
import { getStatus } from "./getStatus/getStatus"

export const BookHistoryContent = observer(() => {
  const bookHistoryState = useContext(BookHistoryStateContext)

  const {
    bookHistory,
  } = bookHistoryState

  return <ClientTable<BookHistoryType>
    data={bookHistory}
    tableId={`book-history`}
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
})