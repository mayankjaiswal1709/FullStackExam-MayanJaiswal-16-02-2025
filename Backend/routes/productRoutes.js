const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.post("/", ProductController.addProduct);

router.put("/:id", ProductController.updateProduct);

router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
