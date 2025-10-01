import { useMemo } from "react"
import { HistoryStateContext } from "./state/HistoryStateContext"
import { HistoryContainer } from "./HistoryContainer"
import { HistoryState } from "./state/HistoryState"

export function HistoryPage() {
  const historyState = useMemo(
    () => new HistoryState(),
    [],
  )

  return (
    <HistoryStateContext.Provider value={historyState}>
      <HistoryContainer />
    </HistoryStateContext.Provider>
  )
}
