import 'react-datepicker/dist/react-datepicker.css'

import './styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from './theme/themeContext'
import { authService } from './common/authService'
import { BrowserRouter } from 'react-router-dom'
import { refreshTokenAndSubscribe } from './common/api/refreshByInterval'
import { AppContainer } from './AppContainer'

async function initApp() {
  await refreshTokenAndSubscribe()

  ReactDOM
    .createRoot(document.getElementById(`root`)!)
    .render(
      <React.StrictMode>
        <authService.AuthProvider>
          <ThemeProvider>
            <BrowserRouter>
              <AppContainer />
            </BrowserRouter>
          </ThemeProvider>
        </authService.AuthProvider>
      </React.StrictMode >,
    )
}

initApp()
