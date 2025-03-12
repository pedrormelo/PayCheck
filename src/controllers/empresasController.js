const db = require("../config/db");


exports.criarEmpresa = (req, res) => {
    const { nomeEmp } = req.body;
    const sql = `INSERT INTO empresas (nomeEmp) VALUES (?)`;

    db.query(sql, [nomeEmp], (err, result) => {
        if (err) {
            console.error("Erro ao criar empresa:", err);
            return res.status(500).json({ error: "Erro ao criar empresa." });
        }
        res.status(201).json({ message: "Empresa criado com sucesso.", contratoId: result.insertId });
    });
}   


exports.listarEmpresa = (req, res) => {
    db.query("SELECT * FROM empresas", (err, result) => {
    if (err) {
        return res.status(500).json({ error: "Erro ao listar empresas." });
    }
    res.json(result);
    });

};


exports.buscarEmpresa = (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM empresas WHERE idEmp = ?`,  [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar empresas." });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Empresa não empresas." });
        }
        res.json(result[0]);
    });

};


exports. atualizarEmpresa = (req, res) => {
    const { id } = req.params;
    const { nomeEmp } = req.body;
    const sql = "UPDATE empresas SET nomeEmp = ? WHERE idEmp = ?";


    db.query(sql, [nomeEmp, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao atualizar empresa." });
        }
        res.json({ message: "Empresa atualizado com sucesso." });
    });

};


exports.deletarEmpresa = (req, res) => {
    const { id } = req.params;
    db.query(`DELETE FROM empresas WHERE idEmp = ?`, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao deletar empresa." });
        }
        res.json({ message: "Empresa deletado com sucesso." });
    });

};
