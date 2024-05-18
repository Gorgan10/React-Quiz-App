import React from 'react'
import {createRoot} from 'react-dom/client';
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store/store.js'


const app = (
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
)

const root = createRoot(document.getElementById('root'))
root.render(app)
registerServiceWorker()