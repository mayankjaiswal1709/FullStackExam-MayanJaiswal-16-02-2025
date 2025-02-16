const db = require("../models/config"); 

const Order = function (order) {
  this.userId = order.userId;
  this.status = order.status;
  this.totalAmount = order.totalAmount;
};


Order.create = (newOrder) => {
  return new Promise((resolve, reject) => {
    db.mysqlConnection.query(
      "INSERT INTO orders SET ?",
      newOrder,
      (err, res) => {
        if (err) {
          console.log("Error creating order: ", err);
          reject(err);
        } else {
          console.log("Created order: ", res);
          resolve(res); 
        }
      }
    );
  });
};


Order.findByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.mysqlConnection.query(
      "SELECT * FROM orders WHERE userId = ?",
      [userId],
      (err, rows) => {
        if (err) {
          console.log("Error retrieving orders: ", err);
          reject(err);
        } else {
          resolve(rows); 
        }
      }
    );
  });
};

Order.findOne = async (id) => {
  try {
    const [rows] = await db.mysqlConnection
      .promise()
      .query("SELECT * FROM orders WHERE id = ?", [id]);
    if (rows.length) {
      return rows[0]; 
    }
    throw { kind: "not_found" }; 
  } catch (err) {
    throw err;
  }
};

module.exports = Order;
