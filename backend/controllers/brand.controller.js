const Brand = require("../models/Brand");

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().lean();
    return res.status(200).json({
      success: true,
      brands,
      count: brands.length,
    });
  } catch (err) {
    console.error("getBrands error:", err);
    return res.status(500).json({
      success: false,
      message: "Không tìm thấy hoặc không đọc được dữ liệu brands",
    });
  }
};

module.exports = {
  getBrands,
};
