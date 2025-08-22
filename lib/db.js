import mysql from "mysql2/promise";

// Create a singleton pool to reuse across API calls in dev
let cached = global._dbPool;
if (!cached) {
  cached = global._dbPool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "bloodyyue",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

export const db = cached;
