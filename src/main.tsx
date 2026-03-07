import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app' // <-- "app" en minuscule ici pour correspondre à app.tsx

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
