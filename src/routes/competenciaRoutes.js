const express = require("express");
const router = express.Router();
const competenciaController = require("../controllers/competenciaController");

router.get("/", competenciaController.listarCompetencia);

module.exports = router;