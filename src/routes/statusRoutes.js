const express = require("express");
const router = express.Router();
const contratosController = require("../controllers/statusController");

router.get("/", contratosController.listarSituacao);

module.exports = router;