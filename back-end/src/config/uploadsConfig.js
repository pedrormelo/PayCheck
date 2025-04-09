const multer = require('multer');
const path = require('path');

//config multer p salvar os pdfs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/contratos/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const contratoId = req.params.idContrato; 
        cb(null, `contrato_${contratoId}${ext}`);
    }
});

//filtro p aceitar apenas pdf
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Apenas arquivos PDF são aceitos."), false);
    }
};

const upload = multer({ storage, fileFilter});

module.exports = upload;