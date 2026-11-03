import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App, { preloadPage, preloadPages } from './App.jsx'
import './index.css'
import { initTranslation } from './lib/translate'
import { loadSiteSettings } from './lib/siteSettings'

initTranslation()

// Contact details, social links and prices saved in the admin dashboard, and
// the code for this page, so the pre-rendered page stays up until both are ready.
Promise.allSettled([loadSiteSettings(), preloadPage(window.location.pathname)]).then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
  preloadPages()
})
