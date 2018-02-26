export default {
    appenders: [
        { type: "console" },
        {
            type: "dateFile",
            filename: "./logs/app.log",
            maxLogSize: 10485760,
            numBackups: 3
        },
        {
            type: "dateFile",
            filename: "./logs/access.log",
            pattern: "-yyyy-MM-dd",
            category: "http"
        },
        {
            type: "logLevelFilter",
            level: "ERROR",
            appender: {
                type: "file",
                filename: "./logs/errors.log"
            }
        }
    ]
}