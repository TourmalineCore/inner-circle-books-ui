import { RequireAccessToken } from './routes/authStateProvider/RequireAccessToken'
import { getPageRoutes } from './routes/pageRoutes'
// import Layout from remote app
import Layout from 'inner_circle_layout_ui/layout'
import { AppStateContext } from './state/AppStateContext'
import { useMemo } from 'react'
import { AppState } from './state/AppState'

// eslint-disable-next-line import/no-default-export
export default function App() { 
  const appState = useMemo(
    () => new AppState(),
    [],
  ) 
  return (
    <AppStateContext.Provider value={appState}>
      <RequireAccessToken>
        <Layout getPageRoutes={getPageRoutes} />
      </RequireAccessToken>
    </AppStateContext.Provider>
  )
}
