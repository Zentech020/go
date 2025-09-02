package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

type HealthResponse struct {
	Status   string    `json:"status"`
	Service  string    `json:"service"`
	Database string    `json:"database"`
	Time     time.Time `json:"time"`
}

type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

var db *sql.DB

func initDB() error {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = os.Getenv("POSTGRES_URL")
	}
	if dsn == "" {
		dsn = "postgres://dev:dev@localhost:5432/app?sslmode=disable"
	}

	var err error
	db, err = sql.Open("postgres", dsn)
	if err != nil {
		return err
	}

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)

	return db.Ping()
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	dbStatus := "connected"
	if err := db.Ping(); err != nil {
		dbStatus = "disconnected"
	}

	response := HealthResponse{
		Status:   "healthy",
		Service:  "go-api",
		Database: dbStatus,
		Time:     time.Now(),
	}

	json.NewEncoder(w).Encode(response)
}

func apiInfoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	response := APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"version":     "1.0.0",
			"environment": getEnvironment(),
			"endpoints": []string{
				"/api/health",
				"/api/info",
				"/api/users",
			},
		},
	}

	json.NewEncoder(w).Encode(response)
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// Example endpoint - replace with actual implementation
	users := []map[string]interface{}{
		{"id": 1, "name": "Example User", "email": "user@example.com"},
	}

	response := APIResponse{
		Success: true,
		Data:    users,
	}

	json.NewEncoder(w).Encode(response)
}

func getEnvironment() string {
	if os.Getenv("CODESPACES") == "true" {
		return "codespaces"
	}
	if os.Getenv("GO_ENV") == "development" {
		return "development"
	}
	return "production"
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		log.Printf("[%s] %s %s", r.Method, r.RequestURI, time.Since(start))
		next.ServeHTTP(w, r)
	})
}

func main() {
	// Initialize database
	if err := initDB(); err != nil {
		log.Printf("Warning: Database connection failed: %v", err)
		log.Println("API will run without database features")
	} else {
		log.Println("Database connected successfully")
		defer db.Close()
	}

	// Create router
	r := mux.NewRouter()
	
	// API routes
	api := r.PathPrefix("/api").Subrouter()
	api.Use(loggingMiddleware)
	api.HandleFunc("/health", healthHandler).Methods("GET")
	api.HandleFunc("/info", apiInfoHandler).Methods("GET")
	api.HandleFunc("/users", usersHandler).Methods("GET")

	// CORS configuration
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://127.0.0.1:5173", "https://*.github.dev"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	handler := c.Handler(r)

	// Get port from environment or default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	addr := fmt.Sprintf(":%s", port)
	log.Printf("Starting Go API server on %s", addr)
	log.Printf("Environment: %s", getEnvironment())
	
	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}