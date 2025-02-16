const db = require("../models/config"); 

const OrderItem = function (orderItem) {
  this.orderId = orderItem.orderId;
  this.productId = orderItem.productId;
  this.quantity = orderItem.quantity;
  this.price = orderItem.price;
};

OrderItem.bulkCreate = (orderItems) => {
  return new Promise((resolve, reject) => {
    const values = orderItems.map((item) => [
      item.productId,
      item.quantity,
      item.price,
    ]);

    db.mysqlConnection.query(
      "INSERT INTO order_items (productId, quantity, price) VALUES ?",
      [values],
      (err, res) => {
        if (err) {
          console.log("Error creating order items: ", err);
          reject(err);
        } else {
          console.log("Created order items: ", res);
          resolve(res);
        }
      }
    );
  });
};

module.exports = OrderItem;
