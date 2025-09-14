#!/usr/bin/env node

import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get port from environment variable or default to 4173
const port = process.env.PORT || 4173;

// Path to the dist directory
const distPath = join(__dirname, 'dist');

console.log(`Starting Fish Record application on port ${port}`);
console.log(`Serving files from: ${distPath}`);

// Create Express app
const app = express();

// Health check endpoint to prevent sleeping
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Fish Record server is running'
  });
});

// Serve static files from dist directory
app.use(express.static(distPath));

// Handle SPA routing - send index.html for all non-static requests
app.get('*', (req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Fish Record app is running on http://0.0.0.0:${port}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nGracefully shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});