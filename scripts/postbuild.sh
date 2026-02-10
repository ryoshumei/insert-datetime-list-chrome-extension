#!/bin/bash

# Post-build script to fix paths and structure

echo "Running post-build fixes..."

# Move HTML file if in wrong location
if [ -f "dist/src/popup/index.html" ]; then
  echo "Moving popup HTML to correct location..."
  mv dist/src/popup/index.html dist/popup/
  rmdir dist/src/popup 2>/dev/null
  rmdir dist/src 2>/dev/null
fi

# Fix absolute paths in HTML to relative paths
if [ -f "dist/popup/index.html" ]; then
  echo "Fixing paths in popup HTML..."
  sed -i '' 's|/popup/index|./index|g' dist/popup/index.html
fi

echo "Post-build fixes complete!"
