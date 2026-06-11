// PM2 ecosystem file for DivorceTalk.in.
// Used like:  pm2 start ecosystem.config.cjs
//
// The app is a Node 22 ESM bundle (dist/boot.js) produced by `npm run build`.
// PM2 keeps it alive, auto-restarts on crash, and rotates logs.

module.exports = {
  apps: [
    {
      name: "divorcetalk",
      script: "./dist/boot.js",
      cwd: __dirname,
      // ESM bundle — PM2 runs `node dist/boot.js` (the .js + the package.json
      // "type": "module" tell Node to use ESM).
      interpreter: "node",
      exec_mode: "fork",
      instances: 1,
      // Restart the process if memory exceeds this (helps catch leaks early).
      max_memory_restart: "512M",
      // Wait this long after a crash before restarting.
      restart_delay: 1500,
      // Don't auto-restart in an infinite tight loop — bail after 5 quick failures.
      max_restarts: 5,
      // Watch is OFF in prod; deploys happen via the deploy script.
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      // Log files relative to PM2's home (usually ~/.pm2/logs/).
      out_file: "/var/log/divorcetalk/out.log",
      error_file: "/var/log/divorcetalk/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
