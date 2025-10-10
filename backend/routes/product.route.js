const router = require("express").Router();

const {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByTopic,
  getProductsBySearchAndFilters,
} = require("../controllers/product.controller.js");

router.get("/", getProducts);
router.get("/filter", getProductsBySearchAndFilters);
router.get("/:id", getProductById);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/topic/:topicId", getProductsByTopic);

module.exports = router;
