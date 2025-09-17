import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env

export default {
  development: {
    username: process.env.DB_USER,      // DB username
    password: process.env.DB_PASSWORD,  // DB password
    database: process.env.DB_NAME,      // DB name
    host: process.env.DB_HOST,          // DB host
    dialect: process.env.DB_DIALECT || "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: ":memory:", // in-memory DB for testing
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
  },
};
