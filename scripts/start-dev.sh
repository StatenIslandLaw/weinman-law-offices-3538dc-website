#!/bin/bash

# Start Next.js development server
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Next.js development server...${NC}"

# Seed /workspace from the image once, then run from /workspace
if [ -d /workspace ]; then
  if [ ! -f /workspace/package.json ]; then
    echo -e "${GREEN}📦 Initializing /workspace from /app...${NC}"
    # Copy all files (including dotfiles) without overwriting if they somehow exist
    # The -a flag preserves permissions, ownership, and timestamps
    shopt -s dotglob nullglob
    cp -a /app/. /workspace/
    # Reuse image dependencies if present to speed up start
    if [ -d /app/node_modules ] && [ ! -e /workspace/node_modules ]; then
      ln -s /app/node_modules /workspace/node_modules
    fi
    echo -e "${GREEN}✅ Workspace initialized${NC}"
  fi
  
  cd /workspace
else
  cd /app
fi

# Set up environment for Next.js
export NODE_OPTIONS="--max-old-space-size=4096"
# Force polling for file watching in container environment
export CHOKIDAR_USEPOLLING=true
export CHOKIDAR_INTERVAL=1000
# Mark this as a Breezy dev server to prevent build conflicts
export BREEZY_DEV_SERVER=true

# Start Next.js development server
echo -e "${GREEN}⚡ Starting Next.js on port ${PORT:-3007}...${NC}"
echo -e "${BLUE}💡 If the server becomes corrupted, run: npm run recover${NC}"
echo -e "${BLUE}🔍 Health check available at: http://localhost:${PORT:-3007}/api/health${NC}"
echo

# Trap to handle graceful shutdown
trap 'echo -e "\n${GREEN}🛑 Shutting down dev server...${NC}"; exit 0' SIGTERM SIGINT

exec npx next dev -H 0.0.0.0 -p ${PORT:-3007}
