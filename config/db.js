import { createPool } from 'mysql2/promise';

const data = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
};

const db = createPool(data);

export default db;