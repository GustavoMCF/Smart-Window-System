import { tratarEvento } from './routes';

export function iniciarSimulacao() {
  setInterval(() => {
    const chance = Math.random();

    if (chance < 0.1) {
      tratarEvento('Água detectada pelo sensor de umidade.');
    } else if (chance >= 0.1 && chance < 0.2) {
      tratarEvento('Baixa luminosidade detectada pelo sensor de luz.');
    }
  }, 5000);
}
