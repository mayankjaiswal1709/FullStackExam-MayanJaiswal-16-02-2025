const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");


router.post("/", OrderController.placeOrder);


router.get("/orders/user/:userId", OrderController.getOrdersByUserId);

router.get("/orders/:id", OrderController.getOrderById);

module.exports = router;
