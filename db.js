import dotenv from "dotenv";
import mysql from "mysql2/promise"; // Use promise-based MySQL
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQLHOST, // Railway Host
  user: process.env.MYSQLUSER, // Railway User
  password: process.env.MYSQLPASSWORD, // Railway Password
  database: process.env.MYSQLDATABASE, // Railway Database
  port: Number(process.env.MYSQLPORT) || 3306, // Ensure port is a number
  waitForConnections: true,
  connectionLimit: 10, // Limit connections to prevent overuse
  queueLimit: 0, // Unlimited queue (adjust if needed)
});

export default pool;
