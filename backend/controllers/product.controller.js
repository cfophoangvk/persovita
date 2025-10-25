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
  const id = Number(req.params.id);
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);

    // lookup maps
    const brandMap = new Map((db.brands || []).map((b) => [b.id, b]));
    const featureMap = new Map((db.features || []).map((f) => [f.id, f]));

    // normalize product -> brand ids (product may store brandId, brand, brands array or brands numeric)
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

    // enrich logic (same as filter)
    const enrichProduct = (p) => {
      const bIds = productBrandIds(p);
      const brands = (bIds || []).map((bid) => {
        const b = brandMap.get(bid);
        return { id: bid, name: b ? b.name : null };
      });

      const fIds =
        Array.isArray(p.features) && p.features.length
          ? p.features.map(Number)
          : (db.productFeatures || [])
            .filter((pf) => pf.productId === p.id)
            .map((pf) => Number(pf.featureId));

      const features = (fIds || []).map((fid) => {
        const f = featureMap.get(fid);
        return { id: fid, title: f ? f.title : null };
      });

      return {
        ...p,
        brands,
        features,
      };
    };

    const product = (db.products || []).find((pr) => Number(pr.id) === id);
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
        : (db.productFeatures || [])
          .filter((pf) => pf.productId === product.id)
          .map((pf) => Number(pf.featureId));

    const featureIdSet = new Set((mainFeatureIds || []).map(Number));
    const relatedIdsFromProducts = new Set(
      (db.products || [])
        .filter((p) => {
          if (Number(p.id) === Number(product.id)) return false;
          const pF = Array.isArray(p.features) ? p.features.map(Number) : [];
          return pF.some((f) => featureIdSet.has(f));
        })
        .map((p) => p.id)
    );

    const relatedIdsFromRelation = new Set(
      (db.productFeatures || [])
        .filter(
          (pf) =>
            featureIdSet.has(Number(pf.featureId)) &&
            Number(pf.productId) !== Number(product.id)
        )
        .map((pf) => pf.productId)
    );

    const combinedRelatedIds = new Set([
      ...relatedIdsFromProducts,
      ...relatedIdsFromRelation,
    ]);

    const relatedProducts = (db.products || [])
      .filter((p) => combinedRelatedIds.has(p.id))
      .slice(0, 6) // limit related items
      .map(enrichProduct);

    return res
      .status(200)
      .json({ success: true, product: enriched, related: relatedProducts });
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

// New: filter by brand(s) (one-to-many) and feature(s) (many-to-many).
// Query example: /products/filter?featureIds=1,2&brandId=2&page=1&limit=10
const getProductsBySearchAndFilters = async (req, res) => {
  // support both singular/plural param names for compatibility
  const brandIds = parseIdList(req.query.brandIds || req.query.brandId);
  const featureIds = parseIdList(req.query.featureIds || req.query.featureId);

  // search query and sort
  const q =
    typeof req.query.q === "string" ? req.query.q.trim().toLowerCase() : null;
  const sort = typeof req.query.sort === "string" ? req.query.sort : null;

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

    // build lookup maps for brands and features
    const brandMap = new Map((db.brands || []).map((b) => [b.id, b]));
    const featureMap = new Map((db.features || []).map((f) => [f.id, f]));

    // normalize product -> brand ids (product may store brandId, brand, brands array or brands numeric)
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

    // products that match any of given brand ids
    const productIdsByBrands = (ids) => {
      if (!ids || !ids.length) return null;
      const idSet = new Set(ids.map(Number));
      return new Set(
        (db.products || [])
          .filter((p) => {
            const bids = productBrandIds(p);
            return bids.some((b) => idSet.has(b));
          })
          .map((p) => p.id)
      );
    };

    // products that match any of given feature ids (features can be on product.features array
    // or via productFeatures relation table)
    const productIdsByFeatures = (ids) => {
      if (!ids || !ids.length) return null;
      const idSet = new Set(ids.map(Number));

      const fromProducts = (db.products || [])
        .filter(
          (p) =>
            Array.isArray(p.features) &&
            p.features.some((f) => idSet.has(Number(f)))
        )
        .map((p) => p.id);

      const fromRelation = (db.productFeatures || [])
        .filter((pf) => idSet.has(Number(pf.featureId)))
        .map((pf) => pf.productId);

      return new Set([...fromProducts, ...fromRelation]);
    };

    const brandSet = productIdsByBrands(brandIds);
    const featureSet = productIdsByFeatures(featureIds);

    let filteredProducts;
    if (brandSet && featureSet) {
      // must match at least one brand AND at least one feature
      const intersection = new Set(
        [...brandSet].filter((id) => featureSet.has(id))
      );
      filteredProducts = (db.products || []).filter((p) =>
        intersection.has(p.id)
      );
    } else if (brandSet) {
      filteredProducts = (db.products || []).filter((p) => brandSet.has(p.id));
    } else if (featureSet) {
      filteredProducts = (db.products || []).filter((p) =>
        featureSet.has(p.id)
      );
    } else {
      // no filters: start with all
      filteredProducts = db.products || [];
    }

    // apply q (search) if present — search in product name, description, brand name, feature title
    if (q) {
      const qLower = q.toLowerCase();
      filteredProducts = filteredProducts.filter((p) => {
        // product fields
        if (p.name && String(p.name).toLowerCase().includes(qLower))
          return true;
        if (
          p.description &&
          String(p.description).toLowerCase().includes(qLower)
        )
          return true;
        // brands attached on product
        const bIds = productBrandIds(p);
        if (bIds && bIds.length) {
          for (const bid of bIds) {
            const b = brandMap.get(Number(bid));
            if (b && String(b.name).toLowerCase().includes(qLower)) return true;
          }
        }
        // product.features array
        if (Array.isArray(p.features) && p.features.length) {
          for (const fid of p.features) {
            const f = featureMap.get(Number(fid));
            if (f && String(f.title).toLowerCase().includes(qLower))
              return true;
          }
        }
        // relation table lookup
        const relFeatureIds = (db.productFeatures || [])
          .filter((pf) => pf.productId === p.id)
          .map((pf) => pf.featureId);
        if (relFeatureIds && relFeatureIds.length) {
          for (const fid of relFeatureIds) {
            const f = featureMap.get(Number(fid));
            if (f && String(f.title).toLowerCase().includes(qLower))
              return true;
          }
        }
        return false;
      });
    }

    // sort if requested
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
      // otherwise leave default order (relevance or DB order)
    }

    // pagination
    const total = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const end = start + limit;
    const paged = filteredProducts.slice(start, end);

    // enrich product objects: attach brands and features arrays of objects
    const enrichProduct = (p) => {
      // brands
      const bIds = productBrandIds(p);
      const brands = (bIds || []).map((id) => {
        const b = brandMap.get(id);
        return { id, name: b ? b.name : null };
      });

      // features (prefer p.features else relation table)
      const fIds =
        Array.isArray(p.features) && p.features.length
          ? p.features.map(Number)
          : (db.productFeatures || [])
            .filter((pf) => pf.productId === p.id)
            .map((pf) => Number(pf.featureId));

      const features = (fIds || []).map((id) => {
        const f = featureMap.get(id);
        return { id, title: f ? f.title : null };
      });

      return {
        ...p,
        brands,
        features,
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
    const db = await fs.promises.readFile(dbPath, "utf-8");
    const data = JSON.parse(db);
    const productReviews = data.productReviews;
    return res.status(200).json(productReviews);
  } catch (error) {
    console.log("GET PRODUCT REVIEWS ERROR: ", error);
  }
  return res.status(404).send("Không tìm thấy bài đánh giá!");
}

const getProductReviewById = async (req, res) => {
  const idQuery = req.params.id;

  if (!idQuery || isNaN(Number(idQuery))) {
    return res.status(400).send("Truyền sai id. Ngu như bò (bò ở đây là TL)!");
  }

  const id = Number(idQuery);

  try {
    const db = await fs.promises.readFile(dbPath, "utf-8");
    const data = JSON.parse(db);
    const productReviews = data.productReviews.filter(review => review.productId === id);
    const numberOfReviews = productReviews.length;
    if (numberOfReviews) {
      return res.status(200).json(productReviews)
    }
  } catch (error) {
    console.log("PRODUCT REVIEW ERROR: " + error);
  }

  return res.status(404).send("Không tìm thấy bài đánh giá!");
}

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByTopic,
  getProductsBySearchAndFilters,
  getProductReviews,
  getProductReviewById
};
