FROM golang:1.21-bookworm

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install additional development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    jq \
    postgresql-client \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Go development tools
RUN go install golang.org/x/tools/gopls@latest && \
    go install github.com/go-delve/delve/cmd/dlv@latest && \
    go install github.com/rakyll/hey@latest && \
    go install github.com/cosmtrek/air@latest && \
    go install golang.org/x/lint/golint@latest

# Install global npm packages
RUN npm install -g pnpm@latest

# Create a non-root user
RUN useradd -m -s /bin/bash vscode && \
    usermod -aG sudo vscode && \
    echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Set environment variables
ENV PATH="/go/bin:${PATH}"
ENV GO111MODULE=on
ENV CGO_ENABLED=1

# Set working directory
WORKDIR /workspace

# Switch to non-root user
USER vscode