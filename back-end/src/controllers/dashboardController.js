const db = require("../config/db") // ou sua conexão

exports.getResumoDashboard = async (req, res) => {
    try {
        const [total] = await db.promise().query("SELECT COUNT(*) AS total FROM contratos")
        const [ativos] = await db.promise().query("SELECT COUNT(*) AS ativos FROM contratos WHERE idStatus = 1")
        const [pendentes] = await db.promise().query("SELECT COUNT(*) AS pendentes FROM contratos WHERE idStatus = 2")
        const [atrasados] = await db.promise().query(`
            SELECT COUNT(DISTINCT c.idContrato) AS atrasados
            FROM contratos c
            LEFT JOIN contratos_competencia cc ON c.idContrato = cc.idContrato
            LEFT JOIN competencia comp ON comp.idComp = cc.idComp
            WHERE cc.dataPag IS NULL AND STR_TO_DATE(CONCAT(comp.anoPag, '-', comp.mesPag, '-01'), '%Y-%m-%d') < CURDATE()
        `)
        const [valorTotal] = await db.promise().query("SELECT SUM(valor) AS totalValor FROM contratos")

        res.json({
            totalContracts: total[0].total,
            activeContracts: ativos[0].ativos,
            pendingContracts: pendentes[0].pendentes,
            latePayments: atrasados[0].atrasados,
            totalValue: Number(valorTotal[0].totalValor || 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            }),
        })
    } catch (err) {
        console.error("Erro em getResumoDashboard:", err)
        res.status(500).json({ error: "Erro ao obter resumo do dashboard" })
    }
}

exports.getPagamentosRecentes = async (req, res) => {
    try {
        const [result] = await db.promise().query(`
        SELECT 
            cc.idContrato,
            e.nomeEmp,
            cc.dataPag,
            cc.valorPago
        FROM contratos_competencia cc
        INNER JOIN contratos c ON cc.idContrato = c.idContrato
        INNER JOIN empresas e ON c.idEmp = e.idEmp
        WHERE cc.dataPag IS NOT NULL
        ORDER BY cc.dataPag DESC
        LIMIT 5
        `)

        res.json(result)
    } catch (err) {
        console.error("Erro em getPagamentosRecentes:", err)
        res.status(500).json({ error: "Erro ao obter pagamentos recentes" })
    }
}


exports.getProximosVencimentos = async (req, res) => {
    try {
        const [result] = await db.promise().query(`
        SELECT 
            c.idContrato,
            e.nomeEmp,
            c.dataVen,
            c.valor
        FROM contratos c
        INNER JOIN empresas e ON c.idEmp = e.idEmp
        WHERE c.dataVen >= CURDATE()
        ORDER BY c.dataVen ASC
        LIMIT 5
        `)

        res.json(result)
    } catch (err) {
        console.error("Erro em getProximosVencimentos:", err)
        res.status(500).json({ error: "Erro ao obter próximos vencimentos" })
    }
}

