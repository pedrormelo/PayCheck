const db = require("../config/db");

exports.listarSituacao = (req, res) => {
    db.query("SELECT * FROM situacao", (err, result) => {
    if (err) {
        return res.status(500).json({ error: "Erro ao listar situacao." });
    }
    res.json(result);
    });

};