const db = require("../config/db");
const moment = require("moment");
const path = require("path");
const fs = require("fs");

//adicionar contrato
exports.criarContrato = (req, res) => {
    let { idEmp, idStatus, idComp, dataVen, valor } = req.body;

    if (!idEmp || !idStatus || !idComp || !dataVen || !valor) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    //calc dataRen
    const dataRen = moment(dataVen).subtract(180, "days").format("YYYY-MM-DD");

    const sql = `
    INSERT INTO contratos (idEmp, idStatus, idComp, dataVen, dataRen, valor) 
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [idEmp, idStatus, idComp, dataVen, dataRen, valor], (err, result) => {
        if (err) {
            console.error("Erro ao criar contrato:", err);
            return res.status(500).json({ error: "Erro ao criar contrato." });
        }
        res.status(201).json({ message: "Contrato criado com sucesso.", contratoId: result.insertId });
    });
}   


//listar todos os contratos
exports.listarContratos = (req, res) => {
    db.query("SELECT * FROM contratos", (err, result) => {
    if (err) {
        return res.status(500).json({ error: "Erro ao listar contratos." });
    }
    res.json(result);
    });

};

//buscar contato pelo id
exports.buscarContrato = (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM contratos WHERE idContrato = ?`,  [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar contrato." });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Contrato não encontrado." });
        }
        res.json(result[0]);
    });

};

//filtrar contrato
exports.filtrarContrato = (req, res) => {
    console.log("🔍 Rota /contratos/filtrar foi acessada com query:", req.query);
    console.log("🔍 Parâmetros recebidos:", req.query);

    const { search, idStatus, mesPag, anoPag } = req.query;
    if (!search && !idStatus && !mesPag && !anoPag) {
        return res.status(400).json({ error: "Nenhum filtro fornecido." });
    }

    let sql = `
        SELECT contratos.*, empresas.nomeEmp, competencia.mesPag, competencia.anoPag
        FROM contratos
        INNER JOIN empresas ON contratos.idEmp = empresas.idEmp
        INNER JOIN competencia ON contratos.idComp = competencia.idComp
        WHERE 1 = 1
    `;

    const params = [];

    //filtrar por nome da empresa ou id do contrato
    if (search) {
        if (!isNaN(search)) {
            sql += ` AND contratos.idContrato = ?`;
            params.push(search);
        } else {
            sql += ` AND empresas.nomeEmp LIKE ?`;
            params.push(`%${search}%`);
        }
    }

    //filtrar por status do contrato
    if (idStatus) {
        sql += ` AND contratos.idStatus = ?`;
        params.push(idStatus);
    }

    //filtrar por mês da competência
    if (mesPag && anoPag) {
        sql += ` AND competencia.mesPag = ? AND competencia.anoPag = ?`;
        params.push(mesPag, anoPag);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("❌ Erro ao filtrar contratos:", err);
            return res.status(500).json({ error: "Erro ao filtrar contratos." });
        }
        res.json(results);
    });
};

//atualizar contrato
exports. atualizarContrato = (req, res) => {
    const { id } = req.params;
    const { idEmp, idStatus, idComp, dataVen, dataRen, valor } = req.body;
    const sql = "UPDATE contratos SET idEmp = ?, idStatus = ?, idComp = ?, dataVen = ?, dataRen = ?, valor = ? WHERE idContrato = ?";


    db.query(sql, [idEmp, idStatus, idComp, dataVen, dataRen, valor, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao atualizar contrato." });
        }
        res.json({ message: "Contrato atualizado com sucesso." });
    });

};

//excluir contrato
exports.deletarContrato = (req, res) => {
    const { id } = req.params;
    db.query(`DELETE FROM contratos WHERE idContrato = ?`, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao deletar contrato." });
        }
        res.json({ message: "Contrato deletado com sucesso." });
    });

};

//atualizar status do contrato
exports.atualizarStatus = (req, res) => {
    const { id } = req.params;
    const { idStatus } = req.body;
    const sql = "UPDATE contratos SET idStatus = ? WHERE idContrato = ?";

    db.query(sql, [idStatus, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao atualizar status do contrato." });
        }
        res.json({ message: "Status do contrato atualizado com sucesso!" });
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
};

//Upload contratos em pdf
exports.uploadContratoPDF = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado ou formato inválido." });    
    }

    const filePath = path.join(__dirname, "../../uploads", req.file.filename);

    res.status(201).json({
        message: "PDF do contrato enviado com sucesso.",
        filePath: filePath
    });
};

//Download contratos em pdf
exports.downloadContratoPDF = (req, res) => {
    const filePath = path.join(__dirname, "../../uploads/contratos", `contrato_${req.params.idContrato}.pdf`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Arquivo não encontrado."});

    }

    res.download(filePath);
}