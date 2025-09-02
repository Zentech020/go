⏺ Final Implementation Plan

Short Description (< 500 chars)

Creating a minimal Vite React frontend template with GitHub CodeSpaces compatibility. Features dynamic API URL detection that automatically constructs correct endpoints based on environment (local vs CodeSpaces), CORS-configured
fetch wrapper, health check component for testing connectivity, and Vite proxy setup for local development. All environment detection logic is built-in, making it ready to connect with any backend API running on port 8000.
Perfect as a starter template for full-stack CodeSpaces projects.

---

Implementation Epics for Basic Frontend Template

Epic 1: Clean Frontend Setup

Priority: Critical | Duration: 30 mins

Stories:

1. Remove existing complex components (pizza app, etc.)
2. Clean up unnecessary dependencies from package.json
3. Keep only React, Vite, and essential tooling
4. Preserve critical configuration files

Acceptance Criteria:

- Clean project structure with minimal dependencies
- Vite dev server starts without errors
- No leftover imports from removed components

---

Epic 2: Environment Detection System

Priority: Critical | Duration: 45 mins

Stories:

1. Configure Vite to pass CodeSpaces environment variables
2. Create dynamic API URL detection logic
3. Implement environment detection service
4. Add console logging for debugging

Acceptance Criteria:

- Frontend detects CodeSpaces environment correctly
- API URL changes based on environment
- Environment variables accessible in browser

---

Epic 3: API Service Layer

Priority: High | Duration: 45 mins

Stories:

1. Create src/services/api.js with dynamic URL logic
2. Implement fetch wrapper with CORS configuration
3. Add error handling and response parsing
4. Create reusable API methods (GET, POST, etc.)

Acceptance Criteria:

- API service correctly constructs URLs for both environments
- Fetch includes proper CORS headers
- Error responses handled gracefully

---

Epic 4: Health Check Component

Priority: High | Duration: 30 mins

Stories:

1. Create HealthCheck component
2. Implement API health endpoint call
3. Display connection status visually
4. Show environment information

Acceptance Criteria:

- Component shows API connection status
- Displays current environment (local/CodeSpaces)
- Shows API URL being used
- Updates on connection changes

---

Epic 5: Vite Configuration

Priority: Critical | Duration: 30 mins

Stories:

1. Set up proxy for local development
2. Configure environment variable pass-through
3. Set correct server port (5173)
4. Add build optimizations

Acceptance Criteria:

- Proxy forwards /api to port 8000
- Environment variables available in app
- Build outputs optimized bundle

---

Epic 6: Basic UI Shell

Priority: Medium | Duration: 30 mins

Stories:

1. Create minimal App.jsx with routing structure
2. Add basic styling/CSS reset
3. Create layout wrapper component
4. Add loading states

Acceptance Criteria:

- Clean, minimal UI
- Responsive layout
- Loading indicators work
- Ready for additional components

---

File Structure to Create

/
├── index.html # Entry HTML
├── package.json # Minimal dependencies
├── vite.config.js # Proxy + env config
├── .env.example # Environment template
└── src/
├── main.jsx # React entry point
├── App.jsx # Main component
├── index.css # Basic styles
├── services/
│ ├── api.js # API service with dynamic URLs
│ └── environment.js # Environment detection
└── components/
├── HealthCheck.jsx # API connection test
└── Layout.jsx # Basic layout wrapper

Key Code Snippets to Implement

1. Dynamic API URL (api.js)

const getApiUrl = () => {
if (import.meta.env.VITE_CODESPACES === 'true') {
const domain = import.meta.env.VITE_GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev';
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
return `https://${codespaceName}-8000.${domain}/api`;
}
return '/api';
};

2. Vite Config

export default defineConfig({
plugins: [react()],
server: {
port: 5173,
proxy: {
'/api': {
target: 'http://localhost:8000',
changeOrigin: true
}
}
},
define: {
'import.meta.env.VITE_CODESPACES': JSON.stringify(process.env.CODESPACES || 'false'),
'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(process.env.CODESPACE_NAME || '')
}
});

3. Health Check Component

const HealthCheck = () => {
const [status, setStatus] = useState('checking');

    useEffect(() => {
      fetch(`${getApiUrl()}/health`)
        .then(res => res.json())
        .then(() => setStatus('connected'))
        .catch(() => setStatus('disconnected'));
    }, []);

    return (
      <div>
        API Status: {status}
        Environment: {import.meta.env.VITE_CODESPACES === 'true' ? 'CodeSpaces' : 'Local'}
      </div>
    );

};

This basic frontend will be fully ready to connect with the Go backend in your other repository, with all the critical CodeSpaces compatibility built in.
