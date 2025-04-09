const db = require("../config/db");

exports.listarCompetencia = (req, res) => {
    db.query("SELECT * FROM competencia", (err, result) => {
    if (err) {
        return res.status(500).json({ error: "Erro ao listar competencia." });
    }
    res.json(result);
    });

};
