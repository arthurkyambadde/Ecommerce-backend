const express = require("express");
const path = require("path");

const router = express.Router();

router.post("/add-products", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

router.get("/add-products", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

module.exports = router;
