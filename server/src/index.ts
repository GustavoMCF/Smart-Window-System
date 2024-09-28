import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { iniciarSimulacao } from './simulacao';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

iniciarSimulacao();  // Iniciar a simulação de eventos
