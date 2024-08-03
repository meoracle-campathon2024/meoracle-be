module.exports = {
    apps: [
        {
            name: "meoracle-be",
            script: "./dist/src/index.js",
            instances: 2,
            exec_mode: "cluster",
            kill_timeout: 40_000,
            listen_timeout: 60_000,
            wait_ready: true,
            shutdown_with_message: true,
        },
    ],
};
