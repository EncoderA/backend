const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { createSale } = require("../controllers/saleController");
const { getProduct } = require("../controllers/productController");

router.post("/createSale", protect, createSale);
router.get("/createSale", protect, getProduct);

module.exports = router;
