const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/ReportController");

router.get("/daily-revenue", ReportController.getDailyRevenue);

router.get("/top-spenders", ReportController.getTopSpenders);

router.get("/sales-by-category", ReportController.salesByCategoryReport);

module.exports = router;
