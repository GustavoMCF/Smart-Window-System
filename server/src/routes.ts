import { Router } from 'express';
import { iniciarSimulacao, atualizarModoEventos } from './simulacao';
import { cachearResultado } from './cache';  // Middleware de cache

const router = Router();

let modoAutomatico = true;  // Modo de controle da janela
let estadoJanela = 'Fechado';
let eventos: string[] = [];

// Função para tratar eventos de fechamento automático
export function tratarEvento(evento: string) {
  eventos.push(evento);
  console.log(`Evento adicionado: ${evento}`);

  // Verifica se o modo é automático antes de alterar o estado da janela
  if (modoAutomatico) {
    if (evento.includes('Chuva') && estadoJanela !== 'Fechando' && estadoJanela !== 'Fechado') {
      console.log('Modo automático: fechando a janela devido ao evento de chuva.');
      estadoJanela = 'Fechando';
      setTimeout(() => {
        estadoJanela = 'Fechado';
        console.log('Janela fechada.');
      }, 3000); // Simular o tempo de fechamento da janela
    } else if (evento.includes('Luz') && estadoJanela !== 'Abrindo' && estadoJanela !== 'Aberto') {
      console.log('Modo automático: abrindo a janela devido ao evento de luz.');
      estadoJanela = 'Abrindo';
      setTimeout(() => {
        estadoJanela = 'Aberto';
        console.log('Janela aberta.');
      }, 3000); // Simular o tempo de abertura da janela
    }
  } else {
    console.log('Modo manual ativo: evento ignorado.');
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
  console.log(`Modo de controle de janela alterado para: ${modoAutomatico ? 'Automático' : 'Manual'}`);
  res.send(`automatico=${modoAutomatico ? '1' : '0'}`);
});

// Rota para abrir a janela
router.get('/abrir', (req, res) => {
  if (!modoAutomatico && estadoJanela !== 'Aberto') {
    console.log('Abrindo janela manualmente.');
    estadoJanela = 'Abrindo';
    setTimeout(() => {
      estadoJanela = 'Aberto';
      console.log('Janela aberta.');
    }, 3000); // Transição de "Abrindo" para "Aberto" em 3 segundos
    res.send({ success: true, message: 'Janela abrindo' });
  } else if (estadoJanela === 'Aberto') {
    res.status(400).send({ success: false, message: 'Janela já está aberta.' });
  } else {
    res.status(400).send({ success: false, message: 'Modo automático ativado.' });
  }
});

// Rota para fechar a janela
router.get('/fechar', (req, res) => {
  if (!modoAutomatico && estadoJanela !== 'Fechado') {
    console.log('Fechando janela manualmente.');
    estadoJanela = 'Fechando';
    setTimeout(() => {
      estadoJanela = 'Fechado';
      console.log('Janela fechada.');
    }, 3000); // Transição de "Fechando" para "Fechado" em 3 segundos
    res.send({ success: true, message: 'Janela fechando' });
  } else if (estadoJanela === 'Fechado') {
    res.status(400).send({ success: false, message: 'Janela já está fechada.' });
  } else {
    res.status(400).send({ success: false, message: 'Modo automático ativado.' });
  }
});

// Rota para obter o estado da janela com cache
router.get('/estado', cachearResultado(1000), (req, res) => {
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
