const router = require("express").Router();

const { getBrands } = require("../controllers/brand.controller.js");

router.get("/", getBrands);

module.exports = router;
