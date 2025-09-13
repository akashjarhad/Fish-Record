#!/usr/bin/env node

import { spawn } from 'child_process';
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

// Start the serve command
const serveProcess = spawn('npx', ['serve', '-s', '-p', port.toString(), 'dist'], {
  stdio: 'inherit',
  shell: true
});

// Handle process events
serveProcess.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

serveProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nGracefully shutting down...');
  serveProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, shutting down...');
  serveProcess.kill('SIGTERM');
});