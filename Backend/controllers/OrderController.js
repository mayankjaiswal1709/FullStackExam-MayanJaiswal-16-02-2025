const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Cart = require("../models/cart");
const mysql = require("mysql2");
const { mysqlConnection, mongoose } = require("../models/config"); // Import the connection


exports.placeOrder = async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const newOrderResult = await new Promise((resolve, reject) => {
      mysqlConnection.query(
        "INSERT INTO orders (userId, status, totalAmount) VALUES (?, ?, ?)",
        [userId, "pending", totalAmount],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });

    const orderId = newOrderResult.insertId;


    mysqlConnection.query(
      "SELECT * FROM orders WHERE id = ?",
      [orderId],
      async (err, orderRows) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error retrieving order", error: err.message });
        }

        const newOrder = orderRows[0];

        const orderItems = cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          orderId: newOrder.id,
        }));

  
        await Cart.updateOne({ userId }, { items: [] });

        res.status(201).json({
          message: "Order placed successfully",
          order: newOrder,
          items: orderItems,
        });
      }
    );
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      message: "Error placing order",
      error: error.message,
    });
  }
};



exports.getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.findByUserId(userId);
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error retrieving orders:", err);
    res.status(500).json({ message: "Error retrieving orders" });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({
      message: "Error retrieving order",
      error: error.message,
    });
  }
};
