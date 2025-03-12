const express = require("express");
const router = express.Router();
const competenciaController = require("../controllers/competenciaController");

router.post("/", competenciaController.criarContrato);
router.get("/", competenciaController.listarCompetencia);
router.get("/:id", competenciaController.buscarCompetencia);
router.put("/:id", competenciaController.atualizarCompetencia);
router.delete("/:id", competenciaController.deletarCompetencia);

module.exports = router;