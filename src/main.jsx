import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.scss'
import App from './app/App'
import {BrowserRouter} from "react-router";

import key from '/firebaseConfig.js'
import {initializeApp} from "firebase/app"


initializeApp(key)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
    <App />
      </BrowserRouter>
  </StrictMode>,
)
