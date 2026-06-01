# 🐕 Shibarashi Goal Tracker

A personal goal-tracking + shadowing workspace. Light, warm, Shiba-inspired.

## How to start

**Easiest:** double-click **`start.command`** — it launches the server and opens the app in your browser.

**Or from the terminal:**
```bash
cd "goal tracking"
node server.js
```
Then open http://localhost:4178

Requires Node.js (already installed: v22). No `npm install` needed.

## Pages

### Calendar
- Week / Month views of your 3 daily habits (Shadowing · Portfolio · Build)
- Click a habit to mark it done; drag a completed habit to another day to move it
- Streak counter, stats, and a GitHub-style activity heatmap
- 6-month north star: **May 31, 2026 → Nov 30, 2026**

### English / Shadowing
- Paste a YouTube URL → the video embeds
- The transcript auto-loads with timestamps; **click any line to jump the video there** (great for shadowing)
- Take notes beside the video — autosaved per video
- Every video becomes a card in your searchable **Library**
- "Mark today's shadowing done" ties it back to the tracker streak

If a video has no captions (or auto-fetch fails), paste the transcript manually using YouTube's "Show transcript" panel.

## Data

Everything is stored in your browser's `localStorage` on this device:
- `goal_tracker_v1` — habit history
- `shadowing_library_v1` — saved videos, transcripts, and notes

The server is only a transcript fetcher + file server; it stores nothing.
