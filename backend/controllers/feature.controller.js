const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(process.cwd(), "db/database.json");

const getFeatures = async (req, res) => {
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    return res.status(200).json({
      success: true,
      features: db.features || [],
      count: (db.features || []).length,
    });
  } catch (err) {
    console.error("getFeatures error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getFeatures,
};
