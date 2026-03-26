microservices-backend/
│
├── services/
│
│   ├── user-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middleware/
│   │   │   ├── utils/
│   │   │   │   ├── logger.js   # winston
│   │   │   │   └── db.js
│   │   │   └── index.js
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│
│   ├── product-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── cache/          # redis logic
│   │   │   ├── utils/
│   │   │   │   ├── logger.js
│   │   │   │   └── db.js
│   │   │   └── index.js
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│
│   ├── order-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── messaging/      # rabbitmq producer
│   │   │   ├── utils/
│   │   │   │   ├── logger.js
│   │   │   │   └── db.js
│   │   │   └── index.js
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│
│   ├── notification-service/
│   │   ├── src/
│   │   │   ├── consumers/      # rabbitmq consumer
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   │   └── logger.js
│   │   │   └── index.js
│   │   └── package.json
│
├── infra/
│   ├── podman-compose.yml
│   ├── redis/
│   ├── rabbitmq/
│   └── loki/
│
├── shared/   # optional (only utils, no business logic)
│   └── constants/
│
└── README.md