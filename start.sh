#!/bin/bash

# Production start script for Render deployment
# This script provides multiple fallback options for serving the built React app

PORT=${PORT:-4173}

echo "Starting Fish Record application on port $PORT"

# First, try using serve (lightweight static file server)
if command -v npx >/dev/null 2>&1; then
    echo "Using serve to host static files..."
    npx serve dist -s -n -l $PORT
elif command -v vite >/dev/null 2>&1; then
    echo "Using Vite preview server..."
    npx vite preview --port $PORT --host 0.0.0.0
else
    echo "No suitable server found. Installing serve..."
    npm install -g serve
    serve dist -s -n -l $PORT
fi