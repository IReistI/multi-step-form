import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StepProvider } from './context/StepContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StepProvider>
      <App />
    </StepProvider>
  </StrictMode>,
)
