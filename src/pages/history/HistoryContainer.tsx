import { observer } from "mobx-react-lite"
import { HistoryContent } from "./HistoryContent"
import { api } from "../../common/api"
import { useLocation } from "react-router-dom"
import { useContext, useEffect } from "react"
import { HistoryStateContext } from "./state/HistoryStateContext"

export const HistoryContainer = observer(() => {
  const historyState = useContext(HistoryStateContext)

  const location = useLocation()
  const pathnameParts = location
    .pathname
    .split(`/`)
  const id = pathnameParts[3]

  useEffect(() => {
    loadHistoryAsync()
  }, [])

  return (
    <HistoryContent />
  )

  async function loadHistoryAsync() {
    const {
      data,
    } = await api.get<HistoryType[]>(`/books/history/${id}`)
 
    historyState.initialize({
      loadedHistory: data,
    })
  }
})
