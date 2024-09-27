import { Router } from 'express';

const router = Router();

let modoAutomatico = true;
let estado = 'Fechado';
let eventoAtual = '';

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

router.get('/evento', (req, res) => {
  res.send(`evento=${eventoAtual}`);
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

export function tratarEvento(evento: string) {
  eventoAtual = evento;
  if (modoAutomatico) {
    if (estado !== 'Fechado' && estado !== 'Fechando') {
      estado = 'Fechando';
      setTimeout(() => {
        estado = 'Fechado';
        eventoAtual = '';
      }, 3000);
    }
  }
}

export default router;