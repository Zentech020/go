import { useState, useEffect } from 'react'
import HealthCheck from './components/HealthCheck'
import { getApiUrl } from './services/api'
import './App.css'

function App() {
  const [environment, setEnvironment] = useState('detecting...')

  useEffect(() => {
    const isCodespaces = import.meta.env.VITE_CODESPACES === 'true'
    setEnvironment(isCodespaces ? 'GitHub Codespaces' : 'Local Development')
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Go + React Full Stack Template</h1>
        <p className="environment-badge">
          Environment: <strong>{environment}</strong>
        </p>
      </header>

      <main className="app-main">
        <section className="info-section">
          <h2>Quick Start</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Frontend</h3>
              <p>React + Vite running on port 5173</p>
              <code>npm run dev</code>
            </div>
            <div className="info-card">
              <h3>Backend</h3>
              <p>Go API server running on port 8000</p>
              <code>npm run api</code>
            </div>
            <div className="info-card">
              <h3>Database</h3>
              <p>PostgreSQL running on port 5432</p>
              <code>postgres://dev:dev@postgres:5432/app</code>
            </div>
          </div>
        </section>

        <section className="health-section">
          <h2>System Health</h2>
          <HealthCheck />
        </section>

        <section className="api-info">
          <h3>API Configuration</h3>
          <p>Current API URL: <code>{getApiUrl()}</code></p>
        </section>
      </main>

      <footer className="app-footer">
        <p>Ready for development in both local and GitHub Codespaces environments</p>
      </footer>
    </div>
  )
}

export default App