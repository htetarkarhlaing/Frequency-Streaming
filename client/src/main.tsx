import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from './store'
import Routes from './routes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
)
