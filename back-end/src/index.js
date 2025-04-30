require("dotenv").config();

const express = require("express");
const cors = require("cors");

const testeRoutes = require("./routes/teste");
const contratosRoutes = require("./routes/contratosRoutes");
const empresasRoutes = require("./routes/empresasRoutes");
const pagamentosRoutes = require("./routes/pagamentosRoutes");
const competenciaRoutes = require("./routes/competenciaRoutes");
const statusRoutes = require("./routes/statusRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


const app = express();

app.use(cors({
    origin: 'http://localhost:3000', //frontend
    credentials: true, // Permitir cookies
}));

app.use(express.json());

//rotas
app.use('/', testeRoutes);
app.use("/contratos", contratosRoutes);
app.use("/empresas", empresasRoutes);
app.use("/pagamentos", pagamentosRoutes);
app.use("/competencia", competenciaRoutes);
app.use("/status", statusRoutes);
app.use("/dashboard", dashboardRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});