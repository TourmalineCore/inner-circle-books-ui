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
        id: `Employee`,
        accessorFn: ({
          employee,
        }) => employee,
      },
      {
        id: `Date of taking`,
        accessorFn: ({
          borrowDate,
        }) => borrowDate,
        size: 80,
      },
      {
        id: `Scheduled Return Date`,
        accessorFn: ({
          dueReturnDate,
        }) => dueReturnDate,
      
      },
      {
        id: `Actual Return Date`,
        accessorFn: ({
          actualReturnDate,
        }) => actualReturnDate,
        size: 100,
      },
      {
        id: `Status`,
        accessorFn: ({
          dueReturnDate,
          actualReturnDate,
        }) => getStatus({
          dueReturnDate,
          actualReturnDate,
        }),
      },
      {
        id: `Reading Progress`,
        accessorFn: ({
          readingProgress,
        }) => readingProgress,
      },
    ]}
    tcOrder={{
      id: ``,
      desc: false,
    }}
    tcRenderMobileTitle={(row) => row.original.employee}
  />
})