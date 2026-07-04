#!/bin/bash

# Recovery script for Next.js dev server corruption
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${RED}🚨 Next.js Dev Server Recovery Mode${NC}"
echo -e "${YELLOW}This will clean up corrupted Next.js build files and restart the dev server${NC}"
echo

# Function to cleanup Next.js files
cleanup_nextjs() {
    echo -e "${BLUE}🧹 Cleaning up Next.js build artifacts...${NC}"
    
    # Remove .next directory completely
    if [ -d ".next" ]; then
        echo -e "${YELLOW}Removing .next directory...${NC}"
        rm -rf .next
    fi
    
    # Remove node_modules/.cache if it exists
    if [ -d "node_modules/.cache" ]; then
        echo -e "${YELLOW}Removing node_modules cache...${NC}"
        rm -rf node_modules/.cache
    fi
    
    # Remove any temporary build files
    find . -name "*.tmp.*" -type f -delete 2>/dev/null || true
    find . -name "_buildManifest.js.tmp.*" -type f -delete 2>/dev/null || true
    
    echo -e "${GREEN}✅ Cleanup completed${NC}"
}

# Function to check for running processes
check_processes() {
    echo -e "${BLUE}🔍 Checking for running Next.js processes...${NC}"
    
    # Find and kill any running Next.js processes
    NEXT_PIDS=$(pgrep -f "next dev" 2>/dev/null || true)
    if [ ! -z "$NEXT_PIDS" ]; then
        echo -e "${YELLOW}Found running Next.js processes: $NEXT_PIDS${NC}"
        echo -e "${YELLOW}Terminating processes...${NC}"
        kill -TERM $NEXT_PIDS 2>/dev/null || true
        sleep 2
        # Force kill if still running
        kill -KILL $NEXT_PIDS 2>/dev/null || true
        echo -e "${GREEN}✅ Processes terminated${NC}"
    else
        echo -e "${GREEN}✅ No running Next.js processes found${NC}"
    fi
}

# Function to verify file system health
check_filesystem() {
    echo -e "${BLUE}🔍 Checking file system health...${NC}"
    
    # Check if we can create/delete test files
    TEST_FILE=".recovery-test-$$"
    if touch "$TEST_FILE" 2>/dev/null && rm "$TEST_FILE" 2>/dev/null; then
        echo -e "${GREEN}✅ File system is healthy${NC}"
    else
        echo -e "${RED}❌ File system issues detected${NC}"
        echo -e "${YELLOW}You may need to restart the container/server${NC}"
        return 1
    fi
}

# Function to reinstall dependencies if needed
reinstall_deps() {
    echo -e "${BLUE}🔍 Checking package integrity...${NC}"
    
    if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
        echo -e "${YELLOW}Node modules missing or corrupted, reinstalling...${NC}"
        npm ci
        echo -e "${GREEN}✅ Dependencies reinstalled${NC}"
    else
        echo -e "${GREEN}✅ Dependencies look good${NC}"
    fi
}

# Function to start dev server with recovery options
start_dev_server() {
    echo -e "${BLUE}🚀 Starting Next.js dev server with recovery options...${NC}"
    
    # Set recovery environment variables
    export NODE_OPTIONS="--max-old-space-size=4096"
    export CHOKIDAR_USEPOLLING=true
    export CHOKIDAR_INTERVAL=1000
    export BREEZY_DEV_SERVER=true
    export NEXT_TELEMETRY_DISABLED=1
    
    # Start with extra error handling
    echo -e "${GREEN}Starting dev server on port 3007...${NC}"
    echo -e "${YELLOW}If corruption happens again, run: npm run recover${NC}"
    echo
    
    exec npx next dev --turbopack -H 0.0.0.0 -p 3007
}

# Main recovery process
main() {
    echo -e "${BLUE}Starting recovery process...${NC}"
    echo
    
    # Step 1: Check processes
    check_processes
    echo
    
    # Step 2: Check file system
    if ! check_filesystem; then
        echo -e "${RED}❌ Recovery failed due to file system issues${NC}"
        exit 1
    fi
    echo
    
    # Step 3: Cleanup
    cleanup_nextjs
    echo
    
    # Step 4: Check dependencies
    reinstall_deps
    echo
    
    # Step 5: Start dev server
    echo -e "${GREEN}🎉 Recovery complete! Starting dev server...${NC}"
    echo
    start_dev_server
}

# Run main function
main
