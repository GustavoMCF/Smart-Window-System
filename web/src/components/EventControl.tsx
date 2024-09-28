import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EventControl: React.FC = () => {
  const [modoAutomatico, setModoAutomatico] = useState<boolean>(true);
  const [potenciaAgua, setPotenciaAgua] = useState<number>(0);
  const [potenciaLuz, setPotenciaLuz] = useState<number>(0);

  // Função para enviar o estado de eventos (manual/automático) ao backend
  useEffect(() => {
    const updateModo = async () => {
      try {
        await api.post('/event-mode', { modoAutomatico });
      } catch (error) {
        console.error('Erro ao atualizar o modo de eventos no backend:', error);
      }
    };
    updateModo();
  }, [modoAutomatico]);

  // Disparar eventos manuais com base na potência dos sensores
  useEffect(() => {
    if (!modoAutomatico) { // Verificar no modo manual
      if (potenciaAgua > 50) {
        dispararEvento('Chuva detectada, potência alta');
      } else if (potenciaLuz > 50) {
        dispararEvento('Baixa luminosidade, potência alta');
      }
    }
  }, [potenciaAgua, potenciaLuz, modoAutomatico]);

  const dispararEvento = async (evento: string) => {
    try {
      await api.post('/dispararEvento', { evento }); // Enviar o evento ao backend
    } catch (error) {
      console.error('Erro ao disparar evento:', error);
    }
  };

  const toggleModo = () => {
    setModoAutomatico(!modoAutomatico);
  };

  return (
    <div className="event-control">
      <h2>Controle de Eventos</h2>
      <button onClick={toggleModo} className="modoButton">
        {modoAutomatico ? 'Mudar para Modo Manual' : 'Mudar para Modo Automático'}
      </button>

      <div className="control-section">
        <h3>Potência da Água</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={potenciaAgua}
          onChange={(e) => setPotenciaAgua(Number(e.target.value))}
          disabled={modoAutomatico}
        />
        <p>{potenciaAgua}%</p>
      </div>

      <div className="control-section">
        <h3>Potência da Luz</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={potenciaLuz}
          onChange={(e) => setPotenciaLuz(Number(e.target.value))}
          disabled={modoAutomatico}
        />
        <p>{potenciaLuz}%</p>
      </div>
    </div>
  );
};

export default EventControl;
