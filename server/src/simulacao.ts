import { tratarEvento } from './routes'; // Importando corretamente a função tratarEvento

let modoAutomaticoEventos = true; // Define o modo automático para eventos

// Função para iniciar a simulação de eventos de forma automática
export function iniciarSimulacao() {
  setInterval(() => {
    if (modoAutomaticoEventos) {
      const chance = Math.random();
      if (chance < 0.5) {
        tratarEvento('Chuva detectada pelo sensor de umidade.');
      } else if (chance >= 0.5 && chance < 0.8) {
        tratarEvento('Baixa luminosidade detectada pelo sensor de luz.');
      }
    }
  }, 5000); // Intervalo de 5 segundos
}

// Função para alternar o modo de eventos (manual/automático)
export function atualizarModoEventos(modo: boolean) {
  modoAutomaticoEventos = modo;
  console.log(`Modo de eventos atualizado para ${modo ? 'automático' : 'manual'}`);
}
