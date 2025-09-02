# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a full-stack template featuring a Go backend API, React frontend, and PostgreSQL database. The repository is optimized for both local development and GitHub Codespaces with automatic environment detection and configuration.

## Development Environment

The repository uses Docker Compose for orchestration with the following services:
- **App Container**: Go 1.21 + Node.js 20 development environment
- **PostgreSQL**: Version 16 database with persistent storage
- **Ports**: Frontend (5173), Backend (8000), Database (5432)

## Quick Start Commands

```bash
# Start everything
npm run dev:all

# Or run services separately
npm run dev    # Frontend only
npm run api    # Backend only

# Database is started automatically via docker-compose
```

## Common Development Commands

### Frontend (React/Vite)
```bash
npm install        # Install dependencies
npm run dev        # Start dev server (port 5173)
npm run build      # Build for production
npm run preview    # Preview production build
```

### Backend (Go)
```bash
go mod download    # Download dependencies
go run main.go     # Run the API server
go build          # Build binary
go test ./...     # Run tests
go fmt ./...      # Format code
air               # Run with hot reload
```

### Full Stack
```bash
npm run dev:all   # Start frontend + backend concurrently
```

## Architecture & Key Files

### Backend (Go)
- `main.go`: API server with health check, CORS, and PostgreSQL connection
- `go.mod`: Dependencies (Gorilla Mux, pq driver, CORS)
- `.air.toml`: Hot reload configuration

### Frontend (React)
- `src/services/api.js`: Dynamic API URL detection for Codespaces
- `src/services/environment.js`: Environment detection utilities
- `src/components/HealthCheck.jsx`: System health monitoring
- `vite.config.js`: Proxy configuration and environment variables

### Infrastructure
- `docker-compose.yml`: Service orchestration
- `.devcontainer/`: VSCode DevContainer configuration

## GitHub Codespaces Compatibility

The template automatically detects Codespaces environment and constructs proper URLs:
- Local: `http://localhost:PORT`
- Codespaces: `https://{CODESPACE_NAME}-{PORT}.{DOMAIN}`

No manual configuration needed - it just works!

## Database Access

```bash
# Connect to PostgreSQL
psql postgres://dev:dev@localhost:5432/app

# Or from within container
psql -h postgres -U dev -d app
```