#!/bin/bash
# Double-click this file to start Goal Tracker.
cd "$(dirname "$0")"

# Open the browser after a short delay (so the server is up).
( sleep 1; open "http://localhost:4178" ) &

echo "Starting Goal Tracker..."
node server.js
