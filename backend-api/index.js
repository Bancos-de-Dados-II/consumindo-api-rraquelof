import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import sequelize from './database/sequelize.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use('/', taskRoutes);

app.get('/', (req, res)=>{
    res.send('API está rodando');
});

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});

try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    await sequelize.sync({alter: true});
    console.log("Modelos sincronizados com o banco de dados!");
} catch (error) {
    console.error("Erro ao conectar com o banco de dados", error);
}