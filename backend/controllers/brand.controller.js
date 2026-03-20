const path = require("path");

const getBrands = async (req, res) => {
  try {
    // Tạo đường dẫn tuyệt đối từ thư mục gốc
    const dbPath = path.resolve(process.cwd(), "db/database.json");

    // Xóa cache để chắc chắn lấy dữ liệu mới nhất (Cực kỳ quan trọng)
    delete require.cache[require.resolve(dbPath)];

    // Đọc file
    const db = require(dbPath);

    return res.status(200).json({
      success: true,
      brands: db.brands || [],
      count: (db.brands || []).length,
    });
  } catch (err) {
    console.error("getBrands error:", err);
    return res.status(500).json({
      success: false,
      message: "Không tìm thấy hoặc không đọc được file database.json",
    });
  }
};

module.exports = {
  getBrands,
};
