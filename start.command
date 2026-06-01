#!/bin/bash
# Double-click this file to start Shibarashi Goal Tracker.
cd "$(dirname "$0")"

# Friendly check: is Node installed?
if ! command -v node >/dev/null 2>&1; then
  echo ""
  echo "  ⚠️  Node.js is not installed."
  echo "  Please install the LTS version from https://nodejs.org, then run this again."
  echo ""
  echo "  ⚠️  尚未安裝 Node.js。"
  echo "  請到 https://nodejs.org 下載 LTS 版安裝後,再執行一次。"
  echo ""
  read -n 1 -s -r -p "  Press any key to close..."
  exit 1
fi

# Open the browser after a short delay (so the server is up).
( sleep 1.2; open "http://localhost:4178" ) &

echo ""
echo "  🐕 Starting Shibarashi at http://localhost:4178"
echo "  Press Ctrl+C to stop."
echo ""
node server.js
