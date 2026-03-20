const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Feature = require("../models/Feature");
const ProductReview = require("../models/ProductReview");

const parseIdList = (val) => {
  if (!val) return null;
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
    const products = await Product.find().lean();
    return res.status(200).json({
      success: true,
      products,
      count: products.length,
    });
  } catch (err) {
    console.error("getProducts error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getProductById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    // get all brands and features for lookup
    const [brands, features] = await Promise.all([
      Brand.find().lean(),
      Feature.find().lean(),
    ]);
    const brandMap = new Map(brands.map((b) => [b.id, b]));
    const featureMap = new Map(features.map((f) => [f.id, f]));

    const productBrandIds = (p) => {
      if (!p) return [];
      if (Array.isArray(p.brands) && p.brands.length)
        return p.brands.map(Number);
      if (p.brandIds && Array.isArray(p.brandIds))
        return p.brandIds.map(Number);
      if (p.brandId != null) return [Number(p.brandId)];
      if (p.brand != null) return [Number(p.brand)];
      if (p.brands != null && !Array.isArray(p.brands))
        return [Number(p.brands)];
      return [];
    };

    const enrichProduct = (p) => {
      const bIds = productBrandIds(p);
      const brandsArr = (bIds || []).map((bid) => {
        const b = brandMap.get(bid);
        return { id: bid, name: b ? b.name : null };
      });

      const fIds =
        Array.isArray(p.features) && p.features.length
          ? p.features.map(Number)
          : [];

      const featuresArr = (fIds || []).map((fid) => {
        const f = featureMap.get(fid);
        return { id: fid, title: f ? f.title : null };
      });

      return {
        ...p,
        brands: brandsArr,
        features: featuresArr,
      };
    };

    const product = await Product.findOne({ id }).lean();
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const enriched = enrichProduct(product);

    // find related products by shared feature ids
    const mainFeatureIds =
      Array.isArray(product.features) && product.features.length
        ? product.features.map(Number)
        : [];

    let relatedProducts = [];
    if (mainFeatureIds.length > 0) {
      const related = await Product.find({
        id: { $ne: product.id },
        features: { $in: mainFeatureIds },
      })
        .limit(6)
        .lean();
      relatedProducts = related.map(enrichProduct);
    }

    return res
      .status(200)
      .json({ success: true, product: enriched, related: relatedProducts });
  } catch (err) {
    console.error("getProductById error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  const categoryIds = parseIdList(
    req.params.categoryId || req.query.categoryIds || req.query.categoryId
  );
  if (!categoryIds || !categoryIds.length)
    return res
      .status(400)
      .json({ success: false, message: "categoryId is required" });

  try {
    // productCategories relation no longer exists in MongoDB
    // return empty for now as this was unused in the JSON data
    return res
      .status(200)
      .json({ success: true, products: [], count: 0 });
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
    // productTopics relation no longer exists in MongoDB
    // return empty for now as this was unused in the JSON data
    return res
      .status(200)
      .json({ success: true, products: [], count: 0 });
  } catch (err) {
    console.error("getProductsByTopicCategory error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getProductsBySearchAndFilters = async (req, res) => {
  const brandIds = parseIdList(req.query.brandIds || req.query.brandId);
  const featureIds = parseIdList(req.query.featureIds || req.query.featureId);

  const q =
    typeof req.query.q === "string" ? req.query.q.trim().toLowerCase() : null;
  const sort = typeof req.query.sort === "string" ? req.query.sort : null;

  let page = parseInt(req.query.page, 10);
  let limit = parseInt(req.query.limit, 10);
  if (!Number.isFinite(page) || page < 1) page = 1;
  if (!Number.isFinite(limit) || limit < 1) limit = 10;
  const MAX_LIMIT = 100;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  try {
    const [allBrands, allFeatures] = await Promise.all([
      Brand.find().lean(),
      Feature.find().lean(),
    ]);
    const brandMap = new Map(allBrands.map((b) => [b.id, b]));
    const featureMap = new Map(allFeatures.map((f) => [f.id, f]));

    const productBrandIds = (p) => {
      if (!p) return [];
      if (Array.isArray(p.brands) && p.brands.length)
        return p.brands.map(Number);
      if (p.brandIds && Array.isArray(p.brandIds))
        return p.brandIds.map(Number);
      if (p.brandId != null) return [Number(p.brandId)];
      if (p.brand != null) return [Number(p.brand)];
      if (p.brands != null && !Array.isArray(p.brands))
        return [Number(p.brands)];
      return [];
    };

    // Build MongoDB query filter
    const filter = {};

    if (brandIds && brandIds.length) {
      filter.brands = { $in: brandIds };
    }

    if (featureIds && featureIds.length) {
      filter.features = { $in: featureIds };
    }

    // Get all matching products (we need to do text search in-memory for brand/feature name matching)
    let filteredProducts = await Product.find(filter).lean();

    // apply q search if present
    if (q) {
      const qLower = q.toLowerCase();
      filteredProducts = filteredProducts.filter((p) => {
        if (p.name && String(p.name).toLowerCase().includes(qLower))
          return true;
        if (
          p.description &&
          String(p.description).toLowerCase().includes(qLower)
        )
          return true;
        // brands
        const bIds = productBrandIds(p);
        if (bIds && bIds.length) {
          for (const bid of bIds) {
            const b = brandMap.get(Number(bid));
            if (b && String(b.name).toLowerCase().includes(qLower)) return true;
          }
        }
        // features
        if (Array.isArray(p.features) && p.features.length) {
          for (const fid of p.features) {
            const f = featureMap.get(Number(fid));
            if (f && String(f.title).toLowerCase().includes(qLower))
              return true;
          }
        }
        return false;
      });
    }

    // sort
    if (sort) {
      if (sort === "price-asc") {
        filteredProducts.sort(
          (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
        );
      } else if (sort === "price-desc") {
        filteredProducts.sort(
          (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
        );
      } else if (sort === "name-asc") {
        filteredProducts.sort((a, b) =>
          String(a.name).localeCompare(String(b.name))
        );
      } else if (sort === "name-desc") {
        filteredProducts.sort((a, b) =>
          String(b.name).localeCompare(String(a.name))
        );
      }
    }

    // pagination
    const total = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const end = start + limit;
    const paged = filteredProducts.slice(start, end);

    // enrich
    const enrichProduct = (p) => {
      const bIds = productBrandIds(p);
      const brandsArr = (bIds || []).map((id) => {
        const b = brandMap.get(id);
        return { id, name: b ? b.name : null };
      });

      const fIds =
        Array.isArray(p.features) && p.features.length
          ? p.features.map(Number)
          : [];

      const featuresArr = (fIds || []).map((id) => {
        const f = featureMap.get(id);
        return { id, title: f ? f.title : null };
      });

      return {
        ...p,
        brands: brandsArr,
        features: featuresArr,
      };
    };

    const pagedEnriched = paged.map(enrichProduct);

    return res.status(200).json({
      success: true,
      products: pagedEnriched,
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

const getProductReviews = async (req, res) => {
  try {
    const productReviews = await ProductReview.find().lean();
    return res.status(200).json(productReviews);
  } catch (error) {
    console.log("GET PRODUCT REVIEWS ERROR: ", error);
  }
  return res.status(404).send("Không tìm thấy bài đánh giá!");
};

const getProductReviewById = async (req, res) => {
  const idQuery = req.params.id;

  if (!idQuery || isNaN(Number(idQuery))) {
    return res.status(400).send("Truyền sai id. Ngu như bò (bò ở đây là TL)!");
  }

  const id = Number(idQuery);

  try {
    const productReviews = await ProductReview.find({ productId: id }).lean();
    if (productReviews.length) {
      return res.status(200).json(productReviews);
    }
  } catch (error) {
    console.log("PRODUCT REVIEW ERROR: " + error);
  }

  return res.status(404).send("Không tìm thấy bài đánh giá!");
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByTopic,
  getProductsBySearchAndFilters,
  getProductReviews,
  getProductReviewById,
};
