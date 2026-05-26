const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set turbopack root to this project to avoid Next inferring the wrong workspace
  turbopack: {
    root: path.resolve(__dirname),
  },
};

module.exports = nextConfig;
