import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { initTranslation } from './lib/translate'
import { loadSiteSettings } from './lib/siteSettings'

initTranslation()

// Contact details, social links and prices saved in the admin dashboard.
loadSiteSettings().finally(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
})
