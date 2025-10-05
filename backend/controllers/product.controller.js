const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(process.cwd(), "db/database.json");

const parseIdList = (val) => {
  if (!val) return null;
  // support repeated query params (?categoryId=1&categoryId=2) or comma list (?categoryIds=1,2)
  if (Array.isArray(val))
    return val.map((v) => parseInt(v, 10)).filter(Boolean);
  return String(val)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((n) => parseInt(n, 10))
    .filter(Boolean);
};

const getProducts = async (req, res) => {
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    return res.status(200).json({
      success: true,
      products: db.products || [],
      count: (db.products || []).length,
    });
  } catch (err) {
    console.error("getProducts error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getProductById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const product = (db.products || []).find((p) => p.id === id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    return res.status(200).json({ success: true, product });
  } catch (err) {
    console.error("getProductById error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  // support single param or querystring list
  const categoryIds = parseIdList(
    req.params.categoryId || req.query.categoryIds || req.query.categoryId
  );
  if (!categoryIds || !categoryIds.length)
    return res
      .status(400)
      .json({ success: false, message: "categoryId is required" });

  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);

    const allowedProductIds = new Set(
      (db.productCategories || [])
        .filter((pc) => categoryIds.includes(pc.categoryId))
        .map((pc) => pc.productId)
    );

    const products = (db.products || []).filter((p) =>
      allowedProductIds.has(p.id)
    );
    return res
      .status(200)
      .json({ success: true, products, count: products.length });
  } catch (err) {
    console.error("getProductsByCategory error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getProductsByTopic = async (req, res) => {
  const topicIds = parseIdList(
    req.params.topicId || req.query.topicIds || req.query.topicId
  );
  if (!topicIds || !topicIds.length)
    return res
      .status(400)
      .json({ success: false, message: "topicId is required" });

  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);

    const allowedProductIds = new Set(
      (db.productTopics || [])
        .filter((pt) => topicIds.includes(pt.topicId))
        .map((pt) => pt.productId)
    );

    const products = (db.products || []).filter((p) =>
      allowedProductIds.has(p.id)
    );
    return res
      .status(200)
      .json({ success: true, products, count: products.length });
  } catch (err) {
    console.error("getProductsByTopicCategory error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// New: filter by multiple categories and multiple topics simultaneously.
// Query example: /products/filter?categoryIds=1,2&topicIds=3,4&page=1&limit=10
// Behavior:
// - If both categoryIds and topicIds provided: return products that match at least one of the categories AND at least one of the topics.
// - If only one type provided: filter by that type.
// - Supports pagination via page & limit.
const getProductsByFilters = async (req, res) => {
  const categoryIds = parseIdList(
    req.query.categoryIds || req.query.categoryId
  );
  const topicIds = parseIdList(req.query.topicIds || req.query.topicId);

  // pagination params
  let page = parseInt(req.query.page, 10);
  let limit = parseInt(req.query.limit, 10);
  if (!Number.isFinite(page) || page < 1) page = 1;
  if (!Number.isFinite(limit) || limit < 1) limit = 10;
  const MAX_LIMIT = 100;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);

    // helper to build set of productIds matching any of given categoryIds/topicIds
    const productIdsByCategories = (ids) => {
      if (!ids || !ids.length) return null;
      return new Set(
        (db.productCategories || [])
          .filter((pc) => ids.includes(pc.categoryId))
          .map((pc) => pc.productId)
      );
    };
    const productIdsByTopics = (ids) => {
      if (!ids || !ids.length) return null;
      return new Set(
        (db.productTopics || [])
          .filter((pt) => ids.includes(pt.topicId))
          .map((pt) => pt.productId)
      );
    };

    const catSet = productIdsByCategories(categoryIds);
    const topicSet = productIdsByTopics(topicIds);

    let filteredProducts;
    if (catSet && topicSet) {
      // intersection: must be in both sets
      const intersection = new Set(
        [...catSet].filter((id) => topicSet.has(id))
      );
      filteredProducts = (db.products || []).filter((p) =>
        intersection.has(p.id)
      );
    } else if (catSet) {
      filteredProducts = (db.products || []).filter((p) => catSet.has(p.id));
    } else if (topicSet) {
      filteredProducts = (db.products || []).filter((p) => topicSet.has(p.id));
    } else {
      // no filters: return all
      filteredProducts = db.products || [];
    }

    const total = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const end = start + limit;
    const paged = filteredProducts.slice(start, end);

    return res.status(200).json({
      success: true,
      products: paged,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (err) {
    console.error("getProductsByFilters error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByTopic,
  getProductsByFilters,
};
