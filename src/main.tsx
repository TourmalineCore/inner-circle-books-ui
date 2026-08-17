import 'react-datepicker/dist/react-datepicker.css'

import './styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from './theme/themeContext'
import { authService } from './common/authService'
import { logInAsLocalDebugUserIfDebugTokenEnabled } from './common/localDebugAuth'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

async function initApp() {
  logInAsLocalDebugUserIfDebugTokenEnabled()

  await authService.startPeriodicalAccessTokenRefresh()

  ReactDOM
    .createRoot(document.getElementById(`root`)!)
    .render(
      <React.StrictMode>
        <authService.AuthProvider>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </authService.AuthProvider>
      </React.StrictMode>,
    )
}

initApp()
