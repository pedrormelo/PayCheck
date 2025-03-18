const express = require("express");
const router = express.Router();
const contratosController = require("../controllers/contratosController");

router.post("/", contratosController.criarContrato);
router.get("/", contratosController.listarContratos);
router.get("/filtrar", contratosController.filtrarContrato);
router.get("/atrasados", contratosController.listarContratosAtrasados); // Ensure this is before the "/:id" route
router.get("/:id", contratosController.buscarContrato);
router.put("/:id", contratosController.atualizarContrato);
router.delete("/:id", contratosController.deletarContrato);
router.put("/:id/status", contratosController.atualizarStatus);

console.log("🔍 Rotas de contratos carregadas!");

module.exports = router;