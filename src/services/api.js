// Dynamic API URL detection for GitHub Codespaces compatibility
export const getApiUrl = () => {
  if (import.meta.env.VITE_CODESPACES === 'true') {
    const domain = import.meta.env.VITE_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev'
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    if (codespaceName) {
      return `https://${codespaceName}-8000.${domain}/api`
    }
  }
  return '/api'
}

// Fetch wrapper with error handling
export const fetchAPI = async (endpoint, options = {}) => {
  const url = `${getApiUrl()}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  }

  try {
    const response = await fetch(url, defaultOptions)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Request Failed:', error)
    throw error
  }
}

// API methods
export const api = {
  // Health check
  health: () => fetchAPI('/health'),
  
  // Get API info
  info: () => fetchAPI('/info'),
  
  // Users endpoints
  users: {
    list: () => fetchAPI('/users'),
    get: (id) => fetchAPI(`/users/${id}`),
    create: (data) => fetchAPI('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => fetchAPI(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => fetchAPI(`/users/${id}`, {
      method: 'DELETE',
    }),
  },
}

export default api