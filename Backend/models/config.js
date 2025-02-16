const mongoose = require("mongoose");
const mysql = require("mysql2");
require("dotenv").config();


mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB is connected");
});
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error("MySQL connection failed: ", err);
    return;
  }
  console.log("Connected to MySQL database!");
});


module.exports = { mysqlConnection, mongoose};
