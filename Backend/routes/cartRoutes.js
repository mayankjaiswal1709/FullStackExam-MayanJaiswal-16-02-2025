const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.get("/", isAuthenticatedUser, cartController.getCart);

router.post("/add", isAuthenticatedUser, cartController.addToCart);


router.delete("/remove", isAuthenticatedUser, cartController.removeFromCart);

module.exports = router;
