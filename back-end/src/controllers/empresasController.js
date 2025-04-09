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


exports.deletarEmpresa = (req, res) => {
    const { id } = req.params;
    db.query(`DELETE FROM empresas WHERE idEmp = ?`, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao deletar empresa." });
        }
        res.json({ message: "Empresa deletado com sucesso." });
    });

};
