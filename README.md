# Go + React Full Stack Template

A production-ready full-stack template featuring Go backend, React frontend, and PostgreSQL database, optimized for both local development and GitHub Codespaces.

## Features

- **Go Backend** (Port 8000): RESTful API with Gorilla Mux, CORS support, and PostgreSQL integration
- **React Frontend** (Port 5173): Vite-powered React app with hot module replacement
- **PostgreSQL Database** (Port 5432): Containerized database with persistent storage
- **GitHub Codespaces Ready**: Automatic environment detection and URL configuration
- **DevContainer Support**: Full Docker Compose development environment
- **Hot Reload**: Both frontend (Vite) and backend (Air) support hot reloading

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   go mod download
   ```

3. **Start the database**
   ```bash
   docker-compose up postgres -d
   ```

4. **Run the full stack**
   ```bash
   npm run dev:all
   ```

   Or run services individually:
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   npm run api
   ```

### GitHub Codespaces

1. Click "Code" → "Create codespace on main"
2. Wait for the environment to build
3. Run `npm run dev:all` in the terminal
4. All ports will be automatically forwarded with proper URLs

## Project Structure

```
.
├── docker-compose.yml       # Multi-service orchestration
├── .devcontainer/          # DevContainer configuration
│   ├── Dockerfile         # Go + Node.js environment
│   └── devcontainer.json  # VSCode settings
├── main.go                # Go API server
├── go.mod                 # Go dependencies
├── package.json           # Node dependencies & scripts
├── vite.config.js         # Vite configuration
├── index.html             # React entry point
└── src/                   # React source code
    ├── App.jsx           # Main React component
    ├── components/       # React components
    │   └── HealthCheck.jsx
    └── services/         # API services
        ├── api.js        # API client
        └── environment.js # Environment detection
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (frontend) |
| `npm run api` | Start Go API server with hot reload |
| `npm run dev:all` | Start both frontend and backend |
| `npm run build` | Build frontend for production |
| `go build` | Build Go binary |
| `go test ./...` | Run Go tests |

## Environment Variables

See `.env.example` for available configuration options. The template automatically detects GitHub Codespaces environment and adjusts API URLs accordingly.

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/info` - API information
- `GET /api/users` - Example users endpoint

## Database Connection

Default PostgreSQL connection:
```
Host: localhost (or postgres in Docker)
Port: 5432
Database: app
User: dev
Password: dev
```

## Contributing

Feel free to submit issues and pull requests to improve this template.

## License

MIT