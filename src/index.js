require("dotenv").config();

const express = require("express");
const cors = require("cors");
const contratosRoutes = require("./routes/contratosRoutes");
const empresasRoutes = require("./routes/empresasRoutes");
// const competenciaRoutes = require("./routes/competenciaRoutes");
// const statusRoutes = require("./routes/statusRoutes");

const app = express();
app.use(cors());
app.use(express.json());

//rotas
app.use("/contratos", contratosRoutes);
app.use("/empresas", empresasRoutes);
// app.use("/competencia", competenciaRoutes);
// app.use("/status", statusRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});