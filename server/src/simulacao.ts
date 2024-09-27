import { tratarEvento } from './routes';

// Função para iniciar a simulação de eventos
export function iniciarSimulacao() {
  setInterval(() => {
    const chance = Math.random();

    // Simulação de eventos aleatórios
    if (chance < 0.5) {  
      tratarEvento('Chuva detectada pelo sensor de umidade.'); // Mudando para "chuva"
    } else if (chance >= 0.5 && chance < 0.8) {
      tratarEvento('Baixa luminosidade detectada pelo sensor de luz.');
    }
  }, 3000); // Intervalo de 3 segundos entre cada verificação
}
