const express = require("express");
const router = express.Router();
const contratosController = require("../controllers/contratosController");
const upload = require("../config/uploadsConfig");

router.post("/", contratosController.criarContrato);
router.get("/", contratosController.listarContratos);
router.get("/filtrar", contratosController.filtrarContrato);
router.post("/:idContrato/upload", upload.single("pdfContrato"), contratosController.uploadContratoPDF);
router.get("/:idContrato/download", contratosController.downloadContratoPDF);
router.get("/:id", contratosController.listarContratoPorId);
router.put("/:id", contratosController.atualizarContrato);
router.delete("/:id", contratosController.deletarContrato);
router.put("/:id/status", contratosController.atualizarStatus);

console.log("🔍 Rotas de contratos carregadas!");

module.exports = router;