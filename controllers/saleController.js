const asyncHandler = require("express-async-handler");
const Sale = require("../models/saleModel");


// Create a new sale document and save it to the database
// Create a new sale document and save it to the database
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Item not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});
const createSale = async (req, res) => {
  try {
    const { daySale, date } = req.body;

    if (!daySale || !date) {
      res.status(400).json({ message: "Please enter today's sales and date" });
      return;
    }

    const newSale = new Sale({
      user: req.user._id,
      daySale,
      date
    });

    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = { createSale, getProduct };