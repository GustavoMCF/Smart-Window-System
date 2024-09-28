import { Router } from 'express';
import { iniciarSimulacao, atualizarModoEventos } from './simulacao';
import { cachearResultado } from './cache';  // Middleware de cache

const router = Router();

let modoAutomatico = true;
let estadoJanela = 'Fechado';
let eventos: string[] = [];

// Função para tratar eventos
export function tratarEvento(evento: string) {
  eventos.push(evento);
  console.log(`Evento adicionado: ${evento}`);

  if (evento.includes('Chuva')) {
    estadoJanela = 'Fechando';
  } else if (evento.includes('Luz')) {
    estadoJanela = 'Abrindo';
  }

  // Remover o evento automaticamente após 10 segundos
  setTimeout(() => {
    eventos = eventos.filter(e => e !== evento);
    console.log(`Evento removido: ${evento}`);
  }, 10000);
}

// Rota para alternar o modo de controle da janela (manual/automático)
router.get('/toggleModo', (req, res) => {
  modoAutomatico = !modoAutomatico;
  res.send(`automatico=${modoAutomatico ? '1' : '0'}`);
});

// Rota para abrir a janela
router.get('/abrir', (req, res) => {
  if (!modoAutomatico) {
    estadoJanela = 'Abrindo';
    setTimeout(() => {
      estadoJanela = 'Aberto';
    }, 3000);
    res.send({ success: true, message: 'Janela abrindo' });
  } else {
    res.status(400).send({ success: false, message: 'Modo automático ativado.' });
  }
});

// Rota para fechar a janela
router.get('/fechar', (req, res) => {
  if (!modoAutomatico) {
    estadoJanela = 'Fechando';
    setTimeout(() => {
      estadoJanela = 'Fechado';
    }, 3000);
    res.send({ success: true, message: 'Janela fechando' });
  } else {
    res.status(400).send({ success: false, message: 'Modo automático ativado.' });
  }
});

// Rota para obter o estado da janela com cache
router.get('/estado', cachearResultado(3000), (req, res) => {
  res.send(`estado=${estadoJanela}`);
});

// Rota para alternar o modo de eventos (manual/automático)
router.post('/event-mode', (req, res) => {
  const { modoAutomatico } = req.body;
  if (modoAutomatico !== undefined) {
    atualizarModoEventos(modoAutomatico);
    res.send(`Modo de eventos atualizado para ${modoAutomatico ? 'automático' : 'manual'}`);
  } else {
    res.status(400).send({ success: false, message: 'Modo de eventos inválido' });
  }
});

// Rota para disparar eventos manualmente
router.post('/dispararEvento', (req, res) => {
  const { evento } = req.body;
  if (evento) {
    tratarEvento(evento); // Disparar o evento manualmente
    res.send({ success: true, message: 'Evento disparado com sucesso' });
  } else {
    res.status(400).send({ success: false, message: 'Evento inválido' });
  }
});

// Rota para obter os eventos
router.get('/eventos', (req, res) => {
  res.json({ eventos });
});

export default router;
