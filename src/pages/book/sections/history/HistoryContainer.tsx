import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { HistoryStateContext } from "./state/HistoryStateContext"
import { HistoryContent } from "./HistoryContent"
import { api } from "../../../../common/api"

export const HistoryContainer = observer(() => {
  const historyState = useContext(HistoryStateContext)

  useEffect(() => {
    loadHistoryAsync()
  }, [])

  return (
    <HistoryContent />
  )

  async function loadHistoryAsync() {
    const {
      data,
    } = await api.get<HistoryType[]>(`/history`)
    
    historyState.initialize({
      loadedHistory: data,
    })
  }
})
