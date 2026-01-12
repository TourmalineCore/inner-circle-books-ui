import { useEffect, useMemo } from "react"
import { observer } from "mobx-react-lite"
import App from "./App"
import { api } from "./common/api"
import { AppState } from "./state/AppState"
import { AppStateContext } from "./state/AppStateContext"

export const AppContainer = observer(() => {
  const appState = useMemo(
    () => new AppState(),
    [],
  )

  useEffect(() => {
    async function loadKnowledgeAreas() {
      const {
        data: {
          knowledgeAreas,
        },
      } = await api.get<{ 
          knowledgeAreas: KnowledgeArea[], 
        }>(`/knowledge-areas`)
  
      appState.setKnowledgeAreas({
        knowledgeAreas,
      })
    }

    loadKnowledgeAreas()
  }, [])

  return (
    <AppStateContext.Provider value={appState}>
      <App />
    </AppStateContext.Provider>
  )
})
