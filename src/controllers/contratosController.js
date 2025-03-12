const db = require("../config/db");

//adicionar contrato
exports.criarContrato = (req, res) => {
    const { idEmp, idStatus, idComp, dataVen, dataRen, valor} = req.body;
    const sql = `INSERT INTO contratos (idEmp, idStatus, idComp, dataVen, dataRen, valor) VALUES (?, ?, ?, ?, ?, ?)`;

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
