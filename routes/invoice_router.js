const express = require('express');
var router = express.Router();
const InvoiceController = require("../controllers/invoice_controller");

router.get("/", InvoiceController.findAllInvoices);
router.post("/", InvoiceController.insertInvoices);

module.exports = router;