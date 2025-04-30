const express = require("express")
const router = express.Router()
const dashboardController = require("../controllers/dashboardController")

router.get("/resumo", dashboardController.getResumoDashboard)
router.get("/pagamentos-recentes", dashboardController.getPagamentosRecentes)
router.get("/vencimentos", dashboardController.getProximosVencimentos)

module.exports = router

