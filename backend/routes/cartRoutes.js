const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Get Cart by User ID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// Add Product to Cart
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
      await cart.save();
    } else {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex === -1) {
        cart.products.push({ productId, quantity });
      } else {
        cart.products[productIndex].quantity += quantity;
      }
      await cart.save();
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

module.exports = router;
