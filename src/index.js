import React from 'react'
import {createRoot} from 'react-dom/client';
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter} from 'react-router-dom'

const app = (
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)

const root = createRoot(document.getElementById('root'))
root.render(app)
registerServiceWorker()