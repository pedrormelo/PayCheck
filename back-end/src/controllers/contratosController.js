const db = require("../config/db");
const moment = require("moment");
const path = require("path");
const multer = require("multer");
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

exports.listarContratos = (req, res) => {
    const sql = `
        SELECT
            contratos.idContrato, contratos.idEmp, contratos.idStatus, contratos.idComp,
            contratos.dataVen, contratos.dataRen, contratos.valor,
            empresas.nomeEmp,
            situacao.nomeStatus,
            competencia.mesPag, competencia.anoPag
        FROM contratos
        LEFT JOIN empresas ON contratos.idEmp = empresas.idEmp
        LEFT JOIN situacao ON contratos.idStatus = situacao.idStatus
        LEFT JOIN competencia ON contratos.idComp = competencia.idComp
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Erro ao listar contratos:", err);
            return res.status(500).json({ error: "Erro ao listar contratos." });
        }
        res.json(results);
    });
}

exports.listarContratoPorId = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT
            contratos.idContrato, contratos.idEmp, contratos.idStatus, contratos.idComp,
            contratos.dataVen, contratos.dataRen, contratos.valor,
            empresas.nomeEmp,
            situacao.nomeStatus,
            CONCAT(competencia.mesPag, '/', competencia.anoPag) AS competencia
        FROM contratos
        LEFT JOIN empresas ON contratos.idEmp = empresas.idEmp
        LEFT JOIN situacao ON contratos.idStatus = situacao.idStatus
        LEFT JOIN competencia ON contratos.idComp = competencia.idComp
        WHERE contratos.idContrato = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar contrato por ID:", err);
            return res.status(500).json({ error: "Erro ao buscar contrato." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Contrato não encontrado." });
        }

        res.json(results[0]); // Return the first result (since IDs are unique)
    });
}

exports.filtrarContrato = (req, res) => {
    const { search = "", status = "", competencia = "" } = req.query;

    const sql = `
        SELECT 
            contratos.idContrato, contratos.idEmp, contratos.idStatus, contratos.idComp,
            contratos.dataVen, contratos.dataRen, contratos.valor,
            empresas.nomeEmp,
            situacao.nomeStatus,
            competencia.mesPag, competencia.anoPag
        FROM contratos
        LEFT JOIN empresas ON contratos.idEmp = empresas.idEmp
        LEFT JOIN situacao ON contratos.idStatus = situacao.idStatus
        LEFT JOIN competencia ON contratos.idComp = competencia.idComp
        WHERE (
            contratos.idContrato LIKE ?
            OR empresas.nomeEmp LIKE ?
        )
        AND (? = '' OR situacao.situacao = ?)
        AND (? = '' OR CONCAT(competencia.mesPag, '/', competencia.anoPag) = ?)
    `;

    const likeSearch = `%${search}%`;

    db.query(
        sql,
        [likeSearch, likeSearch, status, status, competencia, competencia],
        (err, results) => {
            if (err) {
                console.error("Erro ao filtrar contratos:", err);
                return res.status(500).json({ error: "Erro ao filtrar contratos" });
            }
            res.json(results);
        }
    );
}

//atualizar contrato
exports.atualizarContrato = (req, res) => {
    const { id } = req.params;
    const { idEmp, idStatus, idComp, dataVen, valor } = req.body;

    if (!idEmp || !idStatus || !idComp || !dataVen || !valor) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Recalcular a data de renovação (180 dias antes da nova dataVen)
    const dataRen = moment(dataVen).subtract(180, "days").format("YYYY-MM-DD");

    const sql = `
        UPDATE contratos 
        SET idEmp = ?, idStatus = ?, idComp = ?, dataVen = ?, dataRen = ?, valor = ? 
        WHERE idContrato = ?
        `;


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

    const excluirPagamentos = `DELETE FROM contratos_competencia WHERE idContrato = ?`;
    const excluirContrato = `DELETE FROM contratos WHERE idContrato = ?`;

    db.query(excluirPagamentos, [id], (err) => {
        if (err) {
            console.error("Erro ao excluir pagamentos do contrato:", err);
            return res.status(500).json({ error: "Erro ao excluir pagamentos." });
        }

        db.query(excluirContrato, [id], (err) => {
            if (err) {
                console.error("Erro ao deletar contrato:", err);
                return res.status(500).json({ error: "Erro ao deletar contrato." });
            }

            res.json({ message: "Contrato e pagamentos deletados com sucesso." });
        });
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

//Upload contratos em pdf
exports.uploadContratoPDF = (req, res) => {
    const { idContrato } = req.params;

    if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado ou formato inválido." });
    }

    const pastaDestino = path.join(__dirname, "../../uploads");

    // Garante que a pasta existe
    if (!fs.existsSync(pastaDestino)) {
        fs.mkdirSync(pastaDestino, { recursive: true });
    }

    const nomeFinal = `contrato_${idContrato}.pdf`;
    const caminhoFinal = path.join(pastaDestino, nomeFinal);

    // Move com segurança: copia e deleta o original
    fs.copyFile(req.file.path, caminhoFinal, (err) => {
        if (err) {
            console.error("Erro ao copiar o arquivo:", err);
            return res.status(500).json({ error: "Erro ao salvar o PDF." });
        }

        fs.unlink(req.file.path, () => {
            // Ignora erro ao excluir o temporário
        });

        res.status(201).json({
            message: "PDF do contrato enviado com sucesso.",
            filePath: caminhoFinal,
        });
    });
};


//Download contratos em pdf
exports.downloadContratoPDF = (req, res) => {
    const { idContrato } = req.params;
    const filePath = path.join(__dirname, "../../uploads", `contrato_${idContrato}.pdf`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Arquivo não encontrado." });
    }

    res.download(filePath);
};