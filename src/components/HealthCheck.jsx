import { useState, useEffect } from 'react'
import { api } from '../services/api'
import './HealthCheck.css'

function HealthCheck() {
  const [apiStatus, setApiStatus] = useState('checking')
  const [dbStatus, setDbStatus] = useState('checking')
  const [lastChecked, setLastChecked] = useState(null)
  const [error, setError] = useState(null)

  const checkHealth = async () => {
    setApiStatus('checking')
    setError(null)
    
    try {
      const response = await api.health()
      setApiStatus('connected')
      setDbStatus(response.database || 'unknown')
      setLastChecked(new Date().toLocaleTimeString())
    } catch (err) {
      setApiStatus('disconnected')
      setDbStatus('unknown')
      setError(err.message)
      setLastChecked(new Date().toLocaleTimeString())
    }
  }

  useEffect(() => {
    checkHealth()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return '✅'
      case 'disconnected':
        return '❌'
      case 'checking':
        return '⏳'
      default:
        return '❓'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'connected':
        return 'status-connected'
      case 'disconnected':
        return 'status-disconnected'
      case 'checking':
        return 'status-checking'
      default:
        return 'status-unknown'
    }
  }

  return (
    <div className="health-check">
      <div className="health-grid">
        <div className={`health-item ${getStatusClass(apiStatus)}`}>
          <span className="health-icon">{getStatusIcon(apiStatus)}</span>
          <div className="health-details">
            <h4>API Server</h4>
            <p className="health-status">{apiStatus}</p>
          </div>
        </div>
        
        <div className={`health-item ${getStatusClass(dbStatus)}`}>
          <span className="health-icon">{getStatusIcon(dbStatus)}</span>
          <div className="health-details">
            <h4>Database</h4>
            <p className="health-status">{dbStatus}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="health-error">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="health-footer">
        {lastChecked && (
          <p className="last-checked">Last checked: {lastChecked}</p>
        )}
        <button onClick={checkHealth} className="refresh-button">
          Refresh Status
        </button>
      </div>
    </div>
  )
}

export default HealthCheck