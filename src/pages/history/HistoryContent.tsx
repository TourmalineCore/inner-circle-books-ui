import { observer } from "mobx-react-lite"
import { ClientTable } from '@tourmalinecore/react-table-responsive'
import '@tourmalinecore/react-table-responsive/styles.css'
import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import { useContext } from "react"
import { HistoryStateContext } from "./state/HistoryStateContext"

export const HistoryContent = observer(() => {
  const historyState = useContext(HistoryStateContext)

  const {
    history,
  } = historyState

  return <ClientTable<HistoryType & { status?: string,}>
    data={history}
    tableId={`history`}
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
          status,
        }) => status,
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