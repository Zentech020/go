// Environment detection utilities
export const isCodespaces = () => {
  return import.meta.env.VITE_CODESPACES === 'true'
}

export const getCodespaceName = () => {
  return import.meta.env.VITE_CODESPACE_NAME || null
}

export const getEnvironment = () => {
  if (isCodespaces()) {
    return {
      type: 'codespaces',
      name: getCodespaceName(),
      domain: import.meta.env.VITE_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev',
    }
  }
  
  return {
    type: 'local',
    name: 'localhost',
    domain: 'localhost',
  }
}

export const getServiceUrls = () => {
  const env = getEnvironment()
  
  if (env.type === 'codespaces' && env.name) {
    const domain = env.domain
    return {
      frontend: `https://${env.name}-5173.${domain}`,
      backend: `https://${env.name}-8000.${domain}`,
      database: `https://${env.name}-5432.${domain}`,
    }
  }
  
  return {
    frontend: 'http://localhost:5173',
    backend: 'http://localhost:8000',
    database: 'postgres://dev:dev@localhost:5432/app',
  }
}

export default {
  isCodespaces,
  getCodespaceName,
  getEnvironment,
  getServiceUrls,
}