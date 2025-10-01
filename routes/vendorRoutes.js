const express = require("express");
const router = express.Router();
const session = require("express-session")
const Product = require("../models/productsModel");


// File upload setup
const path = require("path");
const multer = require("multer");

// ensure uploads folder exists: /public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


// Vendor Dashboard
router.get("/vendorDashboard", async (req, res) => {
  const products = await Product.find();

  // Insights
  const totalRevenue = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );
  const expectedRevenue = products.reduce((acc, p) => acc + p.price, 0);
  const stockCapital = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );
  const outOfStock = products.filter((p) => p.quantity === 0).length;

  res.render("vendor", {
    products,
    insights: {
      totalRevenue,
      expectedRevenue,
      stockCapital,
      outOfStock,
    },
  });
});

// Add Product
// Add Product
router.post("/addProduct", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, quantity, color } = req.body;

    let errors = {};

    if (!name) errors.name = "Product name is required";
    if (!category) errors.category = "Category is required";
    if (!price) errors.price = "Price is required";
    if (!quantity) errors.quantity = "Quantity is required";
    if (!color) errors.color = "Color is required";
    if (!req.file) errors.image = "Image is required";

    if (Object.keys(errors).length > 0) {
      // Re-render dashboard with errors and existing products
      const products = await Product.find();
      return res.status(400).render("vendor", {
        products,
        insights: {
          totalRevenue: products.reduce((a, p) => a + p.price * p.quantity, 0),
          expectedRevenue: products.reduce((a, p) => a + p.price, 0),
          stockCapital: products.reduce((a, p) => a + p.price * p.quantity, 0),
          outOfStock: products.filter((p) => p.quantity === 0).length,
        },
        errors,
        formData: req.body, // so user input isn’t lost
      });
    }

    // Save product
    const product = new Product({
      name,
      category,
      price,
      quantity,
      color,
      image: "/uploads/" + req.file.filename,
    });

    await product.save();
    res.redirect("/vendorDashboard");
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).send("Error saving product: " + err.message);
  }
});


module.exports = router;
