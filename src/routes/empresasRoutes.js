const express = require("express");
const router = express.Router();
const empresasController = require("../controllers/empresasController");

router.post("/", empresasController.criarEmpresa);
router.get("/", empresasController.listarEmpresa);
router.get("/:id", empresasController.buscarEmpresa);
router.put("/:id", empresasController.atualizarEmpresa);
router.delete("/:id", empresasController.deletarEmpresa);

module.exports = router;