const router = require("express").Router();

const {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByTopic,
  getProductsBySearchAndFilters,
  getProductReviewById
} = require("../controllers/product.controller.js");

router.get("/", getProducts);
router.get("/filter", getProductsBySearchAndFilters);
router.get("/:id", getProductById);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/topic/:topicId", getProductsByTopic);
router.get("/review/:id", getProductReviewById);

module.exports = router;
