const db = require("../config/db");
const moment = require("moment");

require("moment/locale/pt-br");
moment.locale("pt-br");


exports.registrarPagamento = (req, res) => {
    const { idContrato, idComp, dataPag, valorPago, observacao } = req.body;

    if (!idContrato || !idComp || !dataPag || !valorPago) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const sql = `
        INSERT INTO contratos_competencia (idContrato, idComp, dataPag, observacao, valorPago) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [idContrato, idComp, dataPag, observacao, valorPago], (err, result) => {
        if (err) {
            console.error("Erro ao registrar pagamento:", err);
            return res.status(500).json({ error: "Erro ao registrar pagamento." });
        }
        res.status(201).json({ message: "Pagamento registrado com sucesso." });
    });
};


exports.listarPagamentos = (req, res) => {
    const { idContrato } = req.params;
    const sql = "SELECT * FROM contratos_competencia WHERE idContrato = ?";

    db.query(sql, [idContrato], (err, results) => {
        if (err) {
            console.error("Erro ao listar pagamentos:", err);
            return res.status(500).json({ error: "Erro ao listar pagamentos." });
        }
        res.json(results);
    });
};

exports.calcularAtraso = (req, res) => {
    console.log("🔍 Rota /atraso foi acessada com query:", req.query);
    const { idContrato } = req.params;

    const sql = `
        SELECT MAX(dataPag) as ultimoPagamento
        FROM contratos_competencia
        WHERE idContrato = ?
    `;

    db.query(sql, [idContrato], (err, results) => {
        if (err) {
            console.error("Erro ao calcular atraso:", err);
            return res.status(500).json({ error: "Erro ao calcular atraso." });
        }

        if (results.length === 0 || !results[0].ultimoPagamento) {
            return res.json({ mesesAtraso: 0 }); // No payments, no delay
        }

        const ultimoPagamento = moment(results[0].ultimoPagamento);
        const dataAtual = moment();

        const mesesAtraso = dataAtual.diff(ultimoPagamento, "months");

        res.json({ mesesAtraso: Math.max(0, mesesAtraso) });
    });
};

exports.ultimoPagamento = (req, res) => {
    const { idContrato } = req.params;

    const sql = `
        SELECT MAX(dataPag) as ultimoPagamento
        FROM contratos_competencia
        WHERE contratos_competencia.idContrato = ?
        `;

    db.query(sql, [idContrato], (err, results) => {
        if (err) {
            console.error("Erro ao buscar último pagamento:", err);
            return res.status(500).json({ error: "Erro ao buscar último pagamento." });
        }

        if (!results[0].ultimoPagamento) {
            return res.json({ ultimoPagamento: "Nenhum pagamento registrado." });
        }

        // Formatando a data para "Mês de Ano"
        const dataFormatada = moment(results[0].ultimoPagamento).format("MMMM [de] YYYY");

        res.json({ ultimoPagamento: dataFormatada });
    });

};

exports.registrarUltimoPagamento = (req, res) => {
    const { idContrato } = req.params;
    const dataPag = moment().format("YYYY-MM-DD");

    const sqlGetComp = `
        SELECT idComp FROM contratos WHERE idContrato = ?
    `;

    db.query(sqlGetComp, [idContrato], (err, results) => {
        if (err) {
            console.error("Erro ao buscar competência: ", err);
            return res.status(500).json({ error: "Erro ao buscar competência." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Contrato não encontrado." });
        }

        const idComp = results[0].idComp; //pegameos a competencia do contrato

        // Tenta inserir ou atualiza a dataPag se já existir ON DUPLICATE KEY UPDATE dataPag = VALUES(dataPag); 
        const sqlInsert = `
            INSERT INTO contratos_competencia (idContrato, idComp, dataPag) 
            VALUES (?, ?, ?)
        `;

        db.query(sqlInsert, [idContrato, idComp, dataPag], (err, result) => {
            if (err) {
                console.error("Erro ao registrar pagamento", err);
                return res.status(500).json({ error: "Erro ao registrar pagamento." });
            }

            res.status(201).json({ message: "Pagamento registrado/atualizado com sucesso.", dataPag });

        });
    });
};

//historico

exports.historicoPagamentos = (req, res) => {
    const { idContrato } = req.params;

    const sql = `
        SELECT idPagamento, dataPag, valorPago, observacao,
            CASE
                WHEN dataPag <= CURDATE() THEN 'Pago'
                ELSE 'Pendente'
            END AS status
        FROM contratos_competencia
        WHERE idContrato = ?
        ORDER BY dataPag DESC;
    `;

    db.query(sql, [idContrato], (err, results) => {
        if (err) {
            console.error("Erro ao buscar histórico de pagamentos:", err);
            return res.status(500).json({ error: "Erro ao buscar histórico de pagamentos." });
        }

        if (results.length === 0) {
            return res.json({ historico: [], ultimoPagamento: null });
        }

        // último pagamento é o primeiro da lista ordenada por data DESC
        const ultimo = results[0]?.dataPag;

        res.json({
            historico: results,
            ultimoPagamento: ultimo,
        });
    });
};


exports.deletarPagamento = (req, res) => {
    const { idPagamento } = req.params;
    db.query("DELETE FROM contratos_competencia WHERE idPagamento = ?", [idPagamento], (err, result) => {
        if (err) return res.status(500).json({ error: "Erro ao excluir pagamento." });
        res.json({ message: "Pagamento excluído com sucesso." });
    });
};

//listar contratos atrasados
exports.listarContratosAtrasados = (req, res) => {
    console.log("🔍 Rota /atrasados foi acessada com query:", req.query);
    console.log("🔍 Parâmetros recebidos:", req.query);

    const sql = `
        SELECT contratos.*, empresas.nomeEmp, competencia.mesPag, competencia.anoPag,
        TIMESTAMPDIFF(MONTH, STR_TO_DATE(CONCAT(competencia.anoPag, '-', competencia.mesPag, '-01'), '%Y-%m-%d'), CURDATE()) AS mesesAtraso
        FROM contratos
        INNER JOIN empresas ON contratos.idEmp = empresas.idEmp
        INNER JOIN competencia ON contratos.idComp = competencia.idComp
        WHERE TIMESTAMPDIFF(MONTH, STR_TO_DATE(CONCAT(competencia.anoPag, '-', competencia.mesPag, '-01'), '%Y-%m-%d'), CURDATE()) > 0
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Erro ao listar contratos atrasados:", err);
            return res.status(500).json({ error: "Erro ao listar contratos atrasados." });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Contrato não encontrado." });
        }
        res.json(results);
    });

};//listar contratos atrasados
exports.listarContratosAtrasados = (req, res) => {
    const sql = `
        SELECT 
            contratos.idContrato, 
            contratos.dataVen, 
            contratos.valor, 
            empresas.nomeEmp, 
            competencia.mesPag, 
            competencia.anoPag,
            TIMESTAMPDIFF(MONTH, MAX(contratos_competencia.dataPag), CURDATE()) AS mesesAtraso
        FROM contratos
        LEFT JOIN contratos_competencia ON contratos.idContrato = contratos_competencia.idContrato
        LEFT JOIN empresas ON contratos.idEmp = empresas.idEmp
        LEFT JOIN competencia ON contratos.idComp = competencia.idComp
        GROUP BY contratos.idContrato
        HAVING mesesAtraso > 0
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Erro ao listar contratos atrasados:", err);
            return res.status(500).json({ error: "Erro ao listar contratos atrasados." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Nenhum contrato atrasado encontrado." });
        }

        res.json(results);
    });
};