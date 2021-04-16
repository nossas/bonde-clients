module.exports = {
  apps: [
    {
      name: "worker-app",
      script: "./worker.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        PGUSER: "monkey_user",
        PGPASSWORD: "monkey_pass",
        PGPORT: "49165",
        PGDATABASE: "bonde",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "server-app",
      script: "./server.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        PGUSER: "monkey_user",
        PGPASSWORD: "monkey_pass",
        PGPORT: "49165",
        PGDATABASE: "bonde",
      },
      env_production: {
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};
