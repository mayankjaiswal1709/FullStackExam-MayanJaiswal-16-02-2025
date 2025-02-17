const mongoose = require("mongoose");
const mysql = require("mysql2");
require("dotenv").config();

// MongoDB Connection
mongoose.connect(process.env.URL, {
  useNewUrlParser: true, // Safe to remove, but keeping for backward compatibility
  useUnifiedTopology: true, // Safe to remove, but keeping for backward compatibility
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB is connected");
});
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

// MySQL Connection
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectTimeout: 3600000, 
  multipleStatements: true, 
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error("MySQL connection failed: ", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

module.exports = { mysqlConnection, mongoose };
