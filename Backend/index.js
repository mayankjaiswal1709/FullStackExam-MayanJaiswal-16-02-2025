const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reportRoutes = require("./routes/reportRoutes");

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;



// Middleware
app.use(cors());
app.use(bodyParser.json());

// Main route `/api` that uses sub-routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/products", productRoutes); // Product-related routes
app.use("/api/cart", cartRoutes); // Cart-related routes
app.use("/api/orders", orderRoutes); // Order-related routes
app.use("/api/reports", reportRoutes); // Report-related routes

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
