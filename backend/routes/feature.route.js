const router = require("express").Router();

const { getFeatures } = require("../controllers/feature.controller.js");

router.get("/", getFeatures);

module.exports = router;
