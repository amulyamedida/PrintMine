const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Place Order
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { products, totalAmount, shippingAddress, paymentMethod } = req.body;

  try {
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error placing order" });
  }
});

// Get All Orders for User
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

module.exports = router;
