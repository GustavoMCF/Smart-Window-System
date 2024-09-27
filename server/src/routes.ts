import { Router } from 'express';

const router = Router();

let modoAutomatico = true;
let estado = 'Fechado';
let eventos: string[] = []; // Array para armazenar eventos simulados

router.get('/toggleModo', (req, res) => {
  modoAutomatico = !modoAutomatico;
  res.send(`automatico=${modoAutomatico ? '1' : '0'}`);
});

router.get('/modo', (req, res) => {
  res.send(`automatico=${modoAutomatico ? '1' : '0'}`);
});

router.get('/estado', (req, res) => {
  res.send(`estado=${estado}`);
});

// Endpoint para retornar eventos
router.get('/eventos', (req, res) => {
  res.json({
    eventos: eventos, // Retorna o array de eventos
  });
});

router.get('/abrir', (req, res) => {
  estado = 'Abrindo';
  setTimeout(() => {
    estado = 'Aberto';
  }, 3000);
  res.send('success=1');
});

router.get('/fechar', (req, res) => {
  estado = 'Fechando';
  setTimeout(() => {
    estado = 'Fechado';
  }, 3000);
  res.send('success=1');
});

// Função para adicionar eventos simulados e remover após um tempo
export function tratarEvento(evento: string) {
  eventos.push(evento); // Adiciona o evento ao array
  console.log(`Evento adicionado: ${evento}`); // Log para depuração

  // Remover o evento automaticamente após 5 segundos
  setTimeout(() => {
    eventos = eventos.filter(e => e !== evento); // Remove o evento do array
    console.log(`Evento removido: ${evento}`); // Log para depuração
  }, 5000);
}

export default router;
