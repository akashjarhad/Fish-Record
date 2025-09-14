// Keep-alive service to prevent Render free tier from sleeping
// This script pings your app every 10 minutes to keep it awake

import fetch from 'node-fetch';

const APP_URL = 'https://fish-record-1.onrender.com'; // Replace with your actual URL
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

const keepAlive = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Pinging ${APP_URL}...`);
    const response = await fetch(APP_URL);
    console.log(`[${new Date().toISOString()}] Ping successful: ${response.status}`);
  } catch (error) {
    console.log(`[${new Date().toISOString()}] Ping failed:`, error.message);
  }
};

// Ping immediately, then every 10 minutes
keepAlive();
setInterval(keepAlive, PING_INTERVAL);

console.log(`Keep-alive service started. Pinging ${APP_URL} every ${PING_INTERVAL / 60000} minutes.`);