// backend/routes/teste.ts

const express = require('express');
const router = express.Router();

router.get('/teste', (req, res) => {
    res.json({ mensagem: 'Backend está funcionando!' });
});

console.log('Rota de teste carregada');

module.exports = router;
