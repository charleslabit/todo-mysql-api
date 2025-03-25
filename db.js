import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST, // Railway Host
  user: process.env.MYSQLUSER, // Railway User
  password: process.env.MYSQLPASSWORD, // Railway Password
  database: process.env.MYSQLDATABASE, // Railway Database
  port: process.env.MYSQLPORT, // Railway Port (usually 3306)
  connectTimeout: 20000, // 20 seconds timeout
  waitForConnections: true,
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to Railway MySQL!");
});

export default connection;
