const Product = require("../models/product"); 


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products", error: err });
  }
};


exports.searchProducts = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const products = await Product.find({
      $text: { $search: searchQuery }, 
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error searching products", error: err });
  }
};


exports.getProductById = async (req, res) => {
  const { id } = req.params; 
  try {
    const product = await Product.findById(id); 
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving product", error: err });
  }
};

exports.addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err });
  }
};


exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};
