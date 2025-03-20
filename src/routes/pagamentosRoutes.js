const express = require("express");
const router = express.Router();
const pagamentosController = require("../controllers/pagamentosController");

router.post("/", pagamentosController.registrarPagamento);
router.get("/:idContrato", pagamentosController.listarPagamentos);
router.get("/:idContrato/atraso", pagamentosController.calcularAtraso);
router.get("/:idContrato/ultimo", pagamentosController.ultimoPagamento);
router.post("/:idContrato/registrar", pagamentosController.registrarUltimoPagamento);
router.get("/:idContrato/historico", pagamentosController.historicoPagamentos);

module.exports = router;