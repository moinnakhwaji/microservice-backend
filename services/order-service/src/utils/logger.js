import winston from "winston";

const logger = winston.createLogger({
    level : "info", // yaha debug and level rehte hai ex error → warn → info → http → verbose → debug → silly
    format: winston.format.json(),
    defaultMeta:{service:"user-service"}, // apne json me ye metadata add hoga 
    transports:[
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.File({
            filename:"logs/error.log",
            level:"error"
        }),
        new winston.transports.File({
                filename:"logs/combined.log"
            })

    ]
})

export default logger