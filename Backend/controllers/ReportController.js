const { Op } = require("sequelize");
const Product = require("../models/product");
const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const User = require("../models/user");

const { sequelize } = require("../models/config"); 

exports.getDailyRevenue = async (req, res) => {
  try {
    const revenueData = await sequelize.query(
      `SELECT 
        DATE(o.createdAt) AS date, 
        SUM(oi.price * oi.quantity) AS revenue
      FROM orders AS o
      JOIN order_items AS oi ON o.id = oi.orderId
      WHERE o.createdAt >= CURDATE() - INTERVAL 7 DAY
      GROUP BY DATE(o.createdAt)
      ORDER BY date DESC`,
      {
        type: sequelize.QueryTypes.SELECT, 
      }
    );

    res.status(200).json(revenueData);
  } catch (error) {
    console.error("Error generating daily revenue report:", error);
    res
      .status(500)
      .json({ message: "Error generating report", error: error.message });
  }
};


exports.getTopSpenders = async (req, res) => {
  try {
    const [topSpenders, metadata] = await sequelize.query(
      `SELECT 
        u.id AS userId,
        u.name AS name,
        SUM(oi.price * oi.quantity) AS totalSpent
      FROM users AS u
      JOIN orders AS o ON u.id = o.userId
      JOIN order_items AS oi ON o.id = oi.orderId
      GROUP BY u.id
      ORDER BY totalSpent DESC
      LIMIT 3`
    );
    res.status(200).json(topSpenders);
  } catch (error) {
    console.error("Error generating top spenders report:", error);
    res
      .status(500)
      .json({ message: "Error generating report", error: error.message });
  }
};


exports.salesByCategoryReport = async (req, res) => {
  try {
    const salesData = await Product.aggregate([
      { $group: { _id: "$category", totalSales: { $sum: "$sales" } } },
      { $sort: { totalSales: -1 } },
    ]);
    res.status(200).json(salesData);
  } catch (error) {
    console.error("Error generating sales by category report:", error);
    res
      .status(500)
      .json({ message: "Error generating report", error: error.message });
  }
};
