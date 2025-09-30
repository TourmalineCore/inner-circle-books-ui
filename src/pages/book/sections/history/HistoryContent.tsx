import { observer } from "mobx-react-lite"
import { ClientTable } from '@tourmalinecore/react-table-responsive'
import { useContext } from "react"
import { HistoryStateContext } from "./state/HistoryStateContext"
import '@tourmalinecore/react-table-responsive/styles.css'
import '@tourmalinecore/react-tc-modal/es/index.css'
import '@tourmalinecore/react-tc-ui-kit/es/index.css'
import moment from 'moment'

export const HistoryContent = observer(() => {
  const historyState = useContext(HistoryStateContext)
  const {
    history,
  } = historyState

  return <ClientTable<HistoryType>
    data={history}
    tableId={`history`}
    columns={[
      {
        id: `Employee`,
        accessorFn: (row) => row.employee,
      },
      {
        id: `Date of taking`,
        accessorFn: (row) => moment(row.borrowDate)
          .format(`DD-MM-YYYY`),
        enableSorting: true,
      },
      {
        id: `Scheduled Return Date`,
        accessorFn: (row) => row.dueReturnDate,
      
      },
      {
        id: `Actual Return Date`,
        accessorFn: (row) => row.actualReturnDate,
      },
      {
        id: `Status`,
        accessorFn: (row) => row.status,
      },
      {
        id: `Reading Progress`,
        accessorFn: (row) => row.readingProgress,
      },
    ]}
    tcOrder={{
      id: `Date of taking`,
      desc: false,
    }}
    tcRenderMobileTitle={(row) => row.original.employee}
  />
})