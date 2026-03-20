const Feature = require("../models/Feature");

const getFeatures = async (req, res) => {
  try {
    const features = await Feature.find().lean();
    return res.status(200).json({
      success: true,
      features,
      count: features.length,
    });
  } catch (err) {
    console.error("getFeatures error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getFeatures,
};
