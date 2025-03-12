const express = require("express");
const router = express.Router();
const contratosController = require("../controllers/contratosController");

router.post("/", contratosController.criarContrato);
router.get("/", contratosController.listarContratos);
router.get("/:id", contratosController.buscarContrato);
router.put("/:id", contratosController.atualizarContrato);
router.delete("/:id", contratosController.deletarContrato);

module.exports = router;